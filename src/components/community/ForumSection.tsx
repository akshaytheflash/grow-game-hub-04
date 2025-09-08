import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Search, Pin, Clock, Users, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CreateThreadDialog from './CreateThreadDialog';

interface ForumThread {
  id: string;
  title: string;
  description: string | null;
  category_id: string;
  posts_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  last_activity_at: string;
  created_at: string;
  user_id: string;
  forum_categories?: {
    name: string;
    color: string;
    icon: string;
  };
  profiles?: {
    display_name: string | null;
    username: string | null;
  };
}

interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  threads_count: number;
}

const ForumSection = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCreateThread, setShowCreateThread] = useState(false);

  useEffect(() => {
    loadData();
    seedInitialData();
  }, []);

  const loadData = async () => {
    try {
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('forum_categories')
        .select('*')
        .order('order_index');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Load threads
      let threadsQuery = supabase
        .from('forum_threads')
        .select(`
          *,
          forum_categories!forum_threads_category_id_fkey(
            name,
            color,
            icon
          ),
          profiles!forum_threads_user_id_fkey(
            display_name,
            username
          )
        `)
        .order('is_pinned', { ascending: false })
        .order('last_activity_at', { ascending: false })
        .limit(20);

      if (selectedCategory) {
        threadsQuery = threadsQuery.eq('category_id', selectedCategory);
      }

      const { data: threadsData, error: threadsError } = await threadsQuery;
      
      if (threadsError) throw threadsError;
      setThreads((threadsData || []).map(thread => ({
        ...thread,
        profiles: thread.profiles && typeof thread.profiles === 'object' && !('error' in (thread.profiles as any))
          ? thread.profiles
          : { display_name: 'Anonymous User', username: 'anonymous' }
      })) as ForumThread[]);
    } catch (error) {
      console.error('Error loading forum data:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedInitialData = async () => {
    // Check if categories exist
    const { data: existingCategories } = await supabase
      .from('forum_categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) return;

    // Create categories
    const initialCategories = [
      {
        name: 'General Discussion',
        description: 'General farming topics and discussions',
        icon: '💬',
        color: '#3B82F6',
        order_index: 1,
      },
      {
        name: 'Crop Management',
        description: 'Discussions about growing and managing crops',
        icon: '🌾',
        color: '#10B981',
        order_index: 2,
      },
      {
        name: 'Soil & Water',
        description: 'Soil health, irrigation, and water management',
        icon: '💧',
        color: '#06B6D4',
        order_index: 3,
      },
      {
        name: 'Pest & Disease',
        description: 'Pest control and disease management',
        icon: '🐛',
        color: '#F59E0B',
        order_index: 4,
      },
      {
        name: 'Market & Trade',
        description: 'Market prices, trading, and business discussions',
        icon: '💰',
        color: '#8B5CF6',
        order_index: 5,
      }
    ];

    const { data: newCategories } = await supabase
      .from('forum_categories')
      .insert(initialCategories)
      .select();

    if (newCategories && newCategories.length > 0) {
      // Create sample threads
      const sampleThreads = [
        {
          title: 'Best practices for organic farming in monsoon',
          description: 'Looking for advice on maintaining organic standards during heavy rain season. What are your experiences?',
          category_id: newCategories[0].id,
          user_id: user?.id || '00000000-0000-0000-0000-000000000000',
          posts_count: 12,
          is_pinned: true,
          last_activity_at: new Date().toISOString(),
        },
        {
          title: 'Drip irrigation setup for small farms',
          description: 'Planning to install drip irrigation on 2 acres. Need guidance on system selection and cost estimation.',
          category_id: newCategories[2].id,
          user_id: user?.id || '00000000-0000-0000-0000-000000000000',
          posts_count: 8,
          last_activity_at: new Date().toISOString(),
        },
        {
          title: 'Cotton market prices - what to expect?',
          description: 'Cotton prices have been volatile. Any insights on market trends for the next quarter?',
          category_id: newCategories[4].id,
          user_id: user?.id || '00000000-0000-0000-0000-000000000000',
          posts_count: 15,
          last_activity_at: new Date().toISOString(),
        }
      ];

      await supabase.from('forum_threads').insert(sampleThreads);
    }
  };

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded" />
                  <div className="space-y-2">
                    <div className="w-48 h-4 bg-muted rounded" />
                    <div className="w-32 h-3 bg-muted rounded" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Community Forum</h2>
          <p className="text-sm text-muted-foreground">Join discussions and share knowledge</p>
        </div>
        <Button onClick={() => setShowCreateThread(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="lg:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Button
                  variant={selectedCategory === null ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    selectedCategory === null ? "bg-secondary" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>All Threads</span>
                    <Badge variant="outline" className="text-xs">
                      {threads.length}
                    </Badge>
                  </div>
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className={`w-full justify-start h-auto p-3 ${
                      selectedCategory === category.id ? "bg-secondary" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {category.threads_count || 0}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threads List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredThreads.map((thread) => (
              <Card key={thread.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        {thread.is_pinned && (
                          <Pin className="h-4 w-4 text-primary" />
                        )}
                        <h3 className="font-medium line-clamp-1">{thread.title}</h3>
                        {thread.forum_categories && (
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ 
                              borderColor: thread.forum_categories.color,
                              color: thread.forum_categories.color 
                            }}
                          >
                            {thread.forum_categories.icon} {thread.forum_categories.name}
                          </Badge>
                        )}
                      </div>
                      
                      {thread.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {thread.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs">
                              {thread.profiles?.display_name?.[0] || 
                               thread.profiles?.username?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {thread.profiles?.display_name || 
                             thread.profiles?.username || 'Anonymous'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{thread.posts_count} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(thread.last_activity_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {filteredThreads.length === 0 && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center space-y-2">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">No threads found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? 'Try a different search term' : 'Be the first to start a discussion!'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <CreateThreadDialog
        open={showCreateThread}
        onOpenChange={setShowCreateThread}
        categories={categories}
        onThreadCreated={loadData}
      />
    </div>
  );
};

export default ForumSection;