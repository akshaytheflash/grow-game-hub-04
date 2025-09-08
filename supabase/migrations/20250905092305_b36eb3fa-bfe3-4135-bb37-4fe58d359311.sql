-- First let's see what crop types are available and add the missing ones
ALTER TYPE crop_type ADD VALUE IF NOT EXISTS 'vegetables';
ALTER TYPE crop_type ADD VALUE IF NOT EXISTS 'mixed';

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