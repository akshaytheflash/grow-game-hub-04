-- Community Hub Database Schema

-- Create crop types enum
CREATE TYPE public.crop_type AS ENUM (
  'wheat', 'rice', 'corn', 'tomato', 'potato', 'onion', 'carrot', 'lettuce',
  'soybean', 'cotton', 'sugarcane', 'millet', 'barley', 'oats', 'other'
);

-- Create post types enum  
CREATE TYPE public.post_type AS ENUM (
  'crop_showcase', 'field_journal', 'general', 'swap_listing', 'expert_question'
);

-- Create content status enum
CREATE TYPE public.content_status AS ENUM ('active', 'reported', 'moderated', 'deleted');

-- Community posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_type post_type NOT NULL DEFAULT 'general',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  crop_type crop_type,
  location TEXT,
  status content_status DEFAULT 'active',
  upvotes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Post images table
CREATE TABLE public.post_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_before_image BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE
);

-- Post reactions table
CREATE TABLE public.post_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  reaction_type TEXT DEFAULT 'upvote',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE
);

-- Post comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES public.post_comments(id) ON DELETE CASCADE
);

-- Community pods table
CREATE TABLE public.community_pods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  crop_focus crop_type,
  member_count INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pod members table
CREATE TABLE public.pod_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pod_id, user_id),
  FOREIGN KEY (pod_id) REFERENCES public.community_pods(id) ON DELETE CASCADE
);

-- Forum categories table
CREATE TABLE public.forum_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT 'blue',
  threads_count INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Forum threads table
CREATE TABLE public.forum_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  posts_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (category_id) REFERENCES public.forum_categories(id) ON DELETE CASCADE
);

-- Forum posts table
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT false,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (thread_id) REFERENCES public.forum_threads(id) ON DELETE CASCADE
);

-- Expert sessions table
CREATE TABLE public.expert_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  crop_focus crop_type,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Expert questions table
CREATE TABLE public.expert_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID,
  user_id UUID NOT NULL,
  question TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_answered BOOLEAN DEFAULT false,
  answer TEXT,
  answered_by UUID,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES public.expert_sessions(id) ON DELETE SET NULL
);

-- Swap listings table
CREATE TABLE public.swap_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  item_condition TEXT DEFAULT 'good',
  location TEXT,
  is_available BOOLEAN DEFAULT true,
  wants_in_return TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Community challenges table
CREATE TABLE public.community_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL,
  target_value NUMERIC,
  unit TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  participant_count INTEGER DEFAULT 0,
  total_progress NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Challenge participants table
CREATE TABLE public.challenge_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL,
  user_id UUID NOT NULL,
  current_progress NUMERIC DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(challenge_id, user_id),
  FOREIGN KEY (challenge_id) REFERENCES public.community_challenges(id) ON DELETE CASCADE
);

-- Private messages table
CREATE TABLE public.private_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_pods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pod_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_posts
CREATE POLICY "Community posts are viewable by everyone" ON public.community_posts FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create their own posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for post_images
CREATE POLICY "Post images are viewable by everyone" ON public.post_images FOR SELECT USING (true);
CREATE POLICY "Users can add images to their posts" ON public.post_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.community_posts WHERE id = post_id AND user_id = auth.uid())
);

-- RLS Policies for post_reactions
CREATE POLICY "Users can view all reactions" ON public.post_reactions FOR SELECT USING (true);
CREATE POLICY "Users can create their own reactions" ON public.post_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reactions" ON public.post_reactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reactions" ON public.post_reactions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for post_comments
CREATE POLICY "Comments are viewable by everyone" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for community_pods
CREATE POLICY "Public pods are viewable by everyone" ON public.community_pods FOR SELECT USING (NOT is_private);
CREATE POLICY "Private pods are viewable by members" ON public.community_pods FOR SELECT USING (
  is_private AND EXISTS (SELECT 1 FROM public.pod_members WHERE pod_id = id AND user_id = auth.uid())
);
CREATE POLICY "Users can create pods" ON public.community_pods FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for pod_members
CREATE POLICY "Pod members are viewable by pod members" ON public.pod_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.pod_members pm WHERE pm.pod_id = pod_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Users can join pods" ON public.pod_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for forum categories
CREATE POLICY "Forum categories are viewable by everyone" ON public.forum_categories FOR SELECT USING (true);

-- RLS Policies for forum threads
CREATE POLICY "Forum threads are viewable by everyone" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Users can create threads" ON public.forum_threads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for forum posts
CREATE POLICY "Forum posts are viewable by everyone" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for expert sessions
CREATE POLICY "Expert sessions are viewable by everyone" ON public.expert_sessions FOR SELECT USING (true);

-- RLS Policies for expert questions
CREATE POLICY "Expert questions are viewable by everyone" ON public.expert_questions FOR SELECT USING (true);
CREATE POLICY "Users can create questions" ON public.expert_questions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for swap listings
CREATE POLICY "Active swap listings are viewable by everyone" ON public.swap_listings FOR SELECT USING (is_available = true);
CREATE POLICY "Users can create their own listings" ON public.swap_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own listings" ON public.swap_listings FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for community challenges
CREATE POLICY "Active challenges are viewable by everyone" ON public.community_challenges FOR SELECT USING (is_active = true);

-- RLS Policies for challenge participants
CREATE POLICY "Challenge participants are viewable by everyone" ON public.challenge_participants FOR SELECT USING (true);
CREATE POLICY "Users can join challenges" ON public.challenge_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.challenge_participants FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for private messages
CREATE POLICY "Users can view their own messages" ON public.private_messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send messages" ON public.private_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_pods_updated_at BEFORE UPDATE ON public.community_pods
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_swap_listings_updated_at BEFORE UPDATE ON public.swap_listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();