-- Create quest types enum
CREATE TYPE quest_type AS ENUM ('daily', 'weekly', 'special');

-- Create quest status enum
CREATE TYPE quest_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create quests table for quest templates
CREATE TABLE public.quests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  quest_type quest_type NOT NULL,
  icon TEXT,
  emoji TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user quest progress table
CREATE TABLE public.user_quest_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  status quest_status NOT NULL DEFAULT 'not_started',
  completed_at TIMESTAMP WITH TIME ZONE,
  week_start DATE, -- For weekly quests tracking
  date_assigned DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, quest_id, date_assigned, week_start)
);

-- Enable RLS
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quest_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quests
CREATE POLICY "Quests are viewable by everyone" 
ON public.quests FOR SELECT USING (true);

-- RLS Policies for user_quest_progress
CREATE POLICY "Users can view their own quest progress" 
ON public.user_quest_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quest progress" 
ON public.user_quest_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quest progress" 
ON public.user_quest_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_quest_progress_user_id ON public.user_quest_progress(user_id);
CREATE INDEX idx_user_quest_progress_date_assigned ON public.user_quest_progress(date_assigned);
CREATE INDEX idx_user_quest_progress_week_start ON public.user_quest_progress(week_start);

-- Create trigger for updated_at
CREATE TRIGGER update_quests_updated_at
BEFORE UPDATE ON public.quests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_quest_progress_updated_at
BEFORE UPDATE ON public.user_quest_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default quest templates
INSERT INTO public.quests (title, points, quest_type, icon, emoji, order_index) VALUES
('Save 10 liters of water', 15, 'daily', 'Droplets', '💧', 1),
('Check soil moisture', 10, 'daily', 'Leaf', '🌱', 2),
('Switch off unused equipment', 12, 'daily', 'Zap', '☀️', 3),
('Spot a pollinator insect', 8, 'daily', 'Bug', '🐝', 4),
('Compost organic waste', 10, 'daily', 'Recycle', '🌍', 5),
('Plant 5 saplings', 50, 'weekly', 'Sprout', '🌱', 1),
('Reduce fertilizer by 10%', 40, 'weekly', 'Sprout', '🌿', 2),
('Use renewable energy for 2 activities', 45, 'weekly', 'Sun', '☀️', 3),
('Introduce eco-friendly pest control', 35, 'weekly', 'ShieldCheck', '🛡️', 4),
('Record weekly water usage', 30, 'weekly', 'BarChart3', '📊', 5);

-- Function to initialize quests for new users
CREATE OR REPLACE FUNCTION public.initialize_user_quests(user_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    quest_record RECORD;
    current_week_start DATE;
BEGIN
    -- Calculate current week start (Monday)
    current_week_start := date_trunc('week', CURRENT_DATE)::date;
    
    -- Insert daily quests for today (only if not exists)
    FOR quest_record IN 
        SELECT * FROM public.quests WHERE quest_type = 'daily' AND is_active = true
    LOOP
        INSERT INTO public.user_quest_progress (user_id, quest_id, status, date_assigned)
        VALUES (user_uuid, quest_record.id, 'not_started', CURRENT_DATE)
        ON CONFLICT (user_id, quest_id, date_assigned, week_start) DO NOTHING;
    END LOOP;
    
    -- Insert weekly quests for this week (only if not exists)
    FOR quest_record IN 
        SELECT * FROM public.quests WHERE quest_type = 'weekly' AND is_active = true
    LOOP
        INSERT INTO public.user_quest_progress (user_id, quest_id, status, week_start, date_assigned)
        VALUES (user_uuid, quest_record.id, 'not_started', current_week_start, current_week_start)
        ON CONFLICT (user_id, quest_id, date_assigned, week_start) DO NOTHING;
    END LOOP;
END;
$$;

-- Function to ensure quest states are never pre-set (fail-safe)
CREATE OR REPLACE FUNCTION public.reset_quest_states_to_not_started()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Fail-safe: Force status to 'not_started' on insert if accidentally set otherwise
    IF NEW.status != 'not_started' AND OLD IS NULL THEN
        NEW.status := 'not_started';
        NEW.completed_at := NULL;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger to enforce fail-safe on insert
CREATE TRIGGER enforce_not_started_on_insert
BEFORE INSERT ON public.user_quest_progress
FOR EACH ROW
EXECUTE FUNCTION public.reset_quest_states_to_not_started();

-- Update handle_new_user function to initialize quests
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id, 
    split_part(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  );
  
  -- Initialize quests for the new user
  PERFORM public.initialize_user_quests(NEW.id);
  
  RETURN NEW;
END;
$$;