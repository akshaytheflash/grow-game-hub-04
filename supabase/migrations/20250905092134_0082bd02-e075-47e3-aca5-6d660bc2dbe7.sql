-- Create journal entries table
CREATE TABLE public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pod_id UUID,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  entry_type TEXT NOT NULL DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor relationships table
CREATE TABLE public.mentor_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL,
  learner_id UUID NOT NULL,
  crop_type crop_type,
  status TEXT NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table for moderation
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID NOT NULL,
  reported_content_type TEXT NOT NULL,
  reported_content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journal comments table
CREATE TABLE public.journal_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  journal_entry_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for journal entries
CREATE POLICY "Users can view public journal entries" 
ON public.journal_entries 
FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own journal entries" 
ON public.journal_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journal entries" 
ON public.journal_entries 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for mentor relationships
CREATE POLICY "Users can view their mentor relationships" 
ON public.mentor_relationships 
FOR SELECT 
USING (auth.uid() = mentor_id OR auth.uid() = learner_id);

CREATE POLICY "Users can create mentor relationships" 
ON public.mentor_relationships 
FOR INSERT 
WITH CHECK (auth.uid() = mentor_id OR auth.uid() = learner_id);

CREATE POLICY "Users can update their mentor relationships" 
ON public.mentor_relationships 
FOR UPDATE 
USING (auth.uid() = mentor_id OR auth.uid() = learner_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for reports
CREATE POLICY "Users can create reports" 
ON public.reports 
FOR INSERT 
WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports" 
ON public.reports 
FOR SELECT 
USING (auth.uid() = reporter_id);

-- Create RLS policies for journal comments
CREATE POLICY "Users can view journal comments on public entries" 
ON public.journal_comments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.journal_entries 
  WHERE id = journal_entry_id AND (is_public = true OR user_id = auth.uid())
));

CREATE POLICY "Users can create journal comments" 
ON public.journal_comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_journal_entries_updated_at
BEFORE UPDATE ON public.journal_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample badges for the community
INSERT INTO public.badges (name, description, icon, chapter_id, color) VALUES
('Soil Guardian', 'Awarded for 5+ soil health posts or tips', '🌱', (SELECT id FROM chapters LIMIT 1), 'green'),
('Water Saver', 'Awarded for consistent water-saving tips', '💧', (SELECT id FROM chapters LIMIT 1), 'blue'),
('Pollinator Protector', 'Awarded for biodiversity/pollinator-focused posts', '🐝', (SELECT id FROM chapters LIMIT 1), 'yellow'),
('Eco Mentor', 'Awarded for mentoring or answering 10+ community questions', '🌍', (SELECT id FROM chapters LIMIT 1), 'emerald'),
('Renewable Champion', 'Awarded for promoting renewable energy practices', '🔋', (SELECT id FROM chapters LIMIT 1), 'purple'),
('Storyteller', 'Awarded for 3+ photo story posts', '📸', (SELECT id FROM chapters LIMIT 1), 'pink');

-- Insert sample forum categories
INSERT INTO public.forum_categories (name, description, icon, color, order_index) VALUES
('General Discussion', 'General farming topics and discussions', '💬', 'blue', 1),
('Crop Specific', 'Discussions about specific crops', '🌾', 'green', 2),
('Techniques & Tips', 'Share farming techniques and tips', '🛠️', 'orange', 3),
('Market & Trade', 'Market prices and trading discussions', '📈', 'purple', 4),
('Equipment & Tools', 'Farm equipment and tool discussions', '🚜', 'red', 5);

-- Insert sample community pods
INSERT INTO public.community_pods (name, description, location, crop_focus, created_by, member_count) VALUES
('Gujarat • Vegetables', 'Vegetable farmers in Gujarat sharing tips and experiences', 'Gujarat, India', 'vegetables', (SELECT id FROM profiles LIMIT 1), 25),
('Maharashtra • Cotton', 'Cotton farming community in Maharashtra', 'Maharashtra, India', 'cotton', (SELECT id FROM profiles LIMIT 1), 18),
('Organic • Mixed', 'Organic farmers growing mixed crops across regions', 'Multi-region', 'organic', (SELECT id FROM profiles LIMIT 1), 32);

-- Insert sample community challenges
INSERT INTO public.community_challenges (title, description, challenge_type, target_value, unit, start_date, end_date, participant_count) VALUES
('Water Conservation Challenge', 'Save 10,000 liters of water this month through efficient irrigation', 'water_saving', 10000, 'liters', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 0),
('Organic Transition Challenge', 'Transition 100 hectares to organic farming practices', 'organic_transition', 100, 'hectares', CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', 0),
('Seed Sharing Initiative', 'Share 500 seed packets among community members', 'seed_sharing', 500, 'packets', CURRENT_DATE, CURRENT_DATE + INTERVAL '45 days', 0);

-- Insert sample posts
INSERT INTO public.community_posts (title, content, post_type, crop_type, user_id) VALUES
('Drip Irrigation Success Story', 'Switched to drip irrigation last month and already seeing 30% water savings! The setup was easier than expected and my tomato yield has increased too. Happy to share details with anyone interested.', 'update', 'vegetables', (SELECT user_id FROM profiles LIMIT 1)),
('Organic Pest Control Tip', 'Mix neem oil with water (1:20 ratio) and spray early morning. Works great against aphids and whiteflies. Been using this for 2 years with excellent results on my cotton crop.', 'tip', 'cotton', (SELECT user_id FROM profiles LIMIT 1)),
('From Struggling to Thriving', 'My field transformation over 6 months using sustainable practices. Left image shows poor soil condition, right shows healthy growth after compost and cover cropping.', 'photo_story', 'organic', (SELECT user_id FROM profiles LIMIT 1));

-- Insert sample swap listings
INSERT INTO public.swap_listings (title, description, category, item_condition, location, wants_in_return, user_id) VALUES
('Organic Tomato Seeds - Hybrid Variety', '50 packets of high-yield organic tomato seeds. Excellent germination rate. Perfect for greenhouse or open field cultivation.', 'seeds', 'excellent', 'Pune, Maharashtra', 'Chili seeds or compost', (SELECT user_id FROM profiles LIMIT 1)),
('Hand Weeder Tool - Barely Used', 'High-quality hand weeder, used only twice. Moving to mechanized farming so no longer needed. Great for small plots and organic farms.', 'tools', 'like_new', 'Ahmedabad, Gujarat', 'Pruning shears or cash', (SELECT user_id FROM profiles LIMIT 1));

-- Insert sample expert questions
INSERT INTO public.expert_questions (question, user_id) VALUES
('What is the best time to apply organic fertilizer for wheat crops in North India?', (SELECT user_id FROM profiles LIMIT 1)),
('How can I prevent fungal diseases in my greenhouse without using chemical pesticides?', (SELECT user_id FROM profiles LIMIT 1)),
('What are the water requirements for drip irrigation in cotton farming?', (SELECT user_id FROM profiles LIMIT 1));

-- Insert sample expert session
INSERT INTO public.expert_sessions (title, description, expert_id, scheduled_at, crop_focus) VALUES
('Sustainable Water Management in Agriculture', 'Join our expert discussion on modern water conservation techniques, drip irrigation setup, and rainwater harvesting for small-scale farmers.', (SELECT user_id FROM profiles LIMIT 1), NOW() + INTERVAL '3 days', 'mixed');