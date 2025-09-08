import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  MessageCircle, 
  Clock, 
  Pin, 
  Lock,
  Heart,
  Reply
} from 'lucide-react';

interface ThreadDetails {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  category_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  posts_count: number;
  created_at: string;
  category?: {
    name: string;
    color: string;
  };
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

interface ForumPost {
  id: string;
  content: string;
  user_id: string;
  upvotes: number;
  created_at: string;
  is_solution: boolean;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

const ThreadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState<ThreadDetails | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadThreadDetails();
      loadPosts();
    }
  }, [id]);

  const loadThreadDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          category:forum_categories(name, color)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setThread(data);
    } catch (error) {
      toast.error('Failed to load thread');
      navigate('/community');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('thread_id', id)
        .order('created_at');

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error('Failed to load posts');
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to reply');
      return;
    }

    if (!replyContent.trim()) {
      toast.error('Please enter your reply');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          content: replyContent.trim(),
          thread_id: id,
          user_id: user.id,
        });

      if (error) throw error;
      
      setReplyContent('');
      loadPosts();
      toast.success('Reply posted successfully!');
    } catch (error) {
      toast.error('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Loading thread...</div>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Thread not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/community')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {thread.is_pinned && <Pin className="w-4 h-4 text-blue-500" />}
                    {thread.is_locked && <Lock className="w-4 h-4 text-gray-500" />}
                    <Badge variant="outline">{thread.category?.name}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{thread.title}</CardTitle>
                  {thread.description && (
                    <p className="text-muted-foreground mt-2">{thread.description}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {thread.profiles?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{thread.profiles?.display_name || thread.profiles?.username}</span>
                </div>
                <Clock className="w-4 h-4" />
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                <MessageCircle className="w-4 h-4" />
                <span>{thread.posts_count} replies</span>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Posts */}
        <div className="space-y-4 mb-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {post.profiles?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {post.profiles?.display_name || post.profiles?.username}
                        </span>
                        {post.is_solution && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Solution
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none mb-4">
                      <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        {!thread.is_locked && (
          <Card>
            <CardHeader>
              <CardTitle>Reply to Thread</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleReply} className="space-y-4">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Share your thoughts, experiences, or ask follow-up questions..."
                    rows={6}
                    required
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Posting...' : 'Post Reply'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Sign in to participate in the discussion</p>
                  <Button onClick={() => navigate('/auth')}>Sign In</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThreadDetails;