import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2, Flag, Camera, Lightbulb, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import CreatePostDialog from './CreatePostDialog';

interface Post {
  id: string;
  title: string;
  content: string;
  post_type: string;
  user_id: string;
  upvotes: number;
  comments_count: number;
  created_at: string;
  location: string | null;
  crop_type: string | null;
  status: string | null;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
  user_upvoted?: boolean;
}

const CommunityFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    loadPosts();
    seedInitialPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles!community_posts_user_id_fkey(
            display_name,
            username
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts((data || []).map(post => ({
        ...post,
        profiles: post.profiles && typeof post.profiles === 'object' && !('error' in (post.profiles as any))
          ? post.profiles 
          : { display_name: 'Anonymous User', username: 'anonymous' }
      })) as Post[]);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedInitialPosts = async () => {
    const { data: existingPosts } = await supabase
      .from('community_posts')
      .select('id')
      .limit(1);

    if (existingPosts && existingPosts.length > 0) return;

    const initialPosts = [
      {
        title: 'Drip Irrigation Success Story',
        content: 'Switched to drip irrigation last season and saved 40% water while increasing tomato yield by 25%. The initial investment paid off in just 6 months!',
        post_type: 'story',
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        location: 'Pune, Maharashtra',
        crop_type: 'tomato',
        upvotes: 12,
        comments_count: 5,
        status: 'active'
      },
      {
        title: 'Organic Pest Control Tip',
        content: 'Mix neem oil with soap water (1:10 ratio) and spray early morning. Works great against aphids and doesn\'t harm beneficial insects. Been using this for 3 years!',
        post_type: 'tip',
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        location: 'Gujarat',
        crop_type: 'vegetables',
        upvotes: 18,
        comments_count: 8,
        status: 'active'
      },
      {
        title: 'Soil Health Update',
        content: 'Added compost and vermicompost to my fields. pH improved from 6.2 to 6.8 in just 4 months. Planning to test nitrogen levels next week.',
        post_type: 'update',
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        location: 'Karnataka',
        crop_type: 'mixed',
        upvotes: 9,
        comments_count: 3,
        status: 'active'
      }
    ];

    await (supabase as any).from('community_posts').insert(initialPosts);
  };

  const handleUpvote = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to upvote posts');
      return;
    }

    try {
      // In a real app, you'd track user votes in a separate table
      // For now, just increment the upvotes count
      await (supabase as any).rpc('increment_post_upvotes', { post_id: postId });
      
      // Refresh posts to show updated count
      loadPosts();
      toast.success('Post upvoted!');
    } catch (error) {
      console.error('Error upvoting post:', error);
      toast.error('Failed to upvote post');
    }
  };

  const handleReport = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to report posts');
      return;
    }

    try {
      await (supabase as any).from('content_reports').insert({
        content_type: 'post',
        content_id: postId,
        reporter_id: user.id,
        reason: 'inappropriate',
        status: 'pending'
      });
      
      toast.success('Post reported. Our moderators will review it.');
    } catch (error) {
      console.error('Error reporting post:', error);
      toast.error('Failed to report post');
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return <Camera className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getPostTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      story: 'bg-purple-100 text-purple-800',
      tip: 'bg-yellow-100 text-yellow-800',
      update: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <Badge className={`${variants[type] || 'bg-gray-100 text-gray-800'} text-xs`}>
        {getPostTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="space-y-1">
                  <div className="w-32 h-4 bg-muted rounded" />
                  <div className="w-24 h-3 bg-muted rounded" />
                </div>
              </div>
              <div className="w-48 h-5 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="w-full h-4 bg-muted rounded" />
                <div className="w-3/4 h-4 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Community Feed</h2>
          <p className="text-sm text-muted-foreground">Latest updates, tips, and stories from farmers</p>
        </div>
        <Button onClick={() => setShowCreatePost(true)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Share Update
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {post.profiles?.display_name?.[0] || post.profiles?.username?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">
                        {post.profiles?.display_name || post.profiles?.username || 'Anonymous Farmer'}
                      </h4>
                      {getPostTypeBadge(post.post_type)}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {post.location}
                          </div>
                        </>
                      )}
                      {post.crop_type && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {post.crop_type}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReport(post.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold text-lg">{post.title}</h3>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed">
                {post.content}
              </p>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(post.id)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {post.upvotes || 0}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments_count || 0}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreatePostDialog
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
        onPostCreated={loadPosts}
      />
    </div>
  );
};

export default CommunityFeed;