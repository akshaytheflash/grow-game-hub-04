-- Create chapters table for learning topics
CREATE TABLE public.chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user lesson progress table
CREATE TABLE public.user_lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create user badges table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for chapters (public read)
CREATE POLICY "Chapters are viewable by everyone" 
ON public.chapters 
FOR SELECT 
USING (true);

-- Create policies for lessons (public read)
CREATE POLICY "Lessons are viewable by everyone" 
ON public.lessons 
FOR SELECT 
USING (true);

-- Create policies for badges (public read)
CREATE POLICY "Badges are viewable by everyone" 
ON public.badges 
FOR SELECT 
USING (true);

-- Create policies for user lesson progress
CREATE POLICY "Users can view their own progress" 
ON public.user_lesson_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON public.user_lesson_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_lesson_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for user badges
CREATE POLICY "Users can view their own badges" 
ON public.user_badges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" 
ON public.user_badges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add triggers for timestamp updates
CREATE TRIGGER update_chapters_updated_at
BEFORE UPDATE ON public.chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample chapters
INSERT INTO public.chapters (title, description, icon, order_index) VALUES
('Sustainable Irrigation', 'Learn water-efficient irrigation techniques like drip irrigation, micro-sprinklers, and water conservation methods', 'droplets', 1),
('Sustainable Manure Management', 'Master organic fertilization through proper composting, manure application, and soil health improvement', 'recycle', 2),
('Sustainable Farming Practices', 'Explore crop rotation, cover crops, integrated pest management, and soil conservation techniques', 'leaf', 3),
('Organic Pest Control', 'Natural methods for pest management without harmful chemicals', 'bug', 4),
('Soil Health & Conservation', 'Understanding soil biology, erosion prevention, and nutrient management', 'mountain', 5);

-- Insert sample lessons for Sustainable Irrigation
INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT c.id, l.title, l.content, l.order_index, l.duration_minutes
FROM public.chapters c,
(VALUES 
  ('Introduction to Water Conservation', 'Water is the most precious resource in agriculture. This lesson covers the importance of water conservation, current global water challenges, and how efficient irrigation can save both water and money while improving crop yields.', 1, 8),
  ('Drip Irrigation Fundamentals', 'Drip irrigation delivers water slowly and directly to plant roots through emitters. Learn about system components, installation basics, and how this method can reduce water usage by 30-50% compared to traditional irrigation.', 2, 12),
  ('Micro-Sprinkler Systems', 'Micro-sprinklers provide gentle, even water distribution over small areas. Understand when to use micro-sprinklers versus drip irrigation, installation techniques, and maintenance requirements.', 3, 10),
  ('Scheduling Irrigation Timing', 'Proper timing is crucial for water efficiency. Learn to read soil moisture, understand plant water needs, and create irrigation schedules that maximize water use efficiency.', 4, 15),
  ('Soil Moisture Monitoring', 'Modern tools and techniques for measuring soil moisture levels, including sensors, tensiometers, and visual indicators to optimize irrigation timing.', 5, 10),
  ('Water Quality Management', 'Understanding water sources, filtration systems, and how water quality affects irrigation efficiency and plant health.', 6, 12),
  ('System Maintenance & Troubleshooting', 'Keep your irrigation system running efficiently with regular maintenance, common problem identification, and repair techniques.', 7, 14),
  ('Cost-Benefit Analysis', 'Calculate the return on investment for efficient irrigation systems, including water savings, energy costs, and yield improvements.', 8, 10),
  ('Rainwater Harvesting', 'Collect and store rainwater for irrigation use, reducing dependence on groundwater and municipal supplies.', 9, 12),
  ('Smart Irrigation Technologies', 'Modern automation, sensors, and IoT devices that can optimize irrigation schedules based on weather and soil conditions.', 10, 15)
) AS l(title, content, order_index, duration_minutes)
WHERE c.title = 'Sustainable Irrigation';

-- Insert sample lessons for Sustainable Manure Management
INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT c.id, l.title, l.content, l.order_index, l.duration_minutes
FROM public.chapters c,
(VALUES 
  ('Understanding Organic Matter', 'Organic matter is the foundation of healthy soil. Learn about the carbon-nitrogen ratio, decomposition processes, and how organic materials improve soil structure and fertility.', 1, 10),
  ('Composting Basics', 'Transform organic waste into valuable fertilizer through controlled decomposition. Understand the composting process, required materials, and optimal conditions for fast, effective composting.', 2, 15),
  ('Animal Manure Types & Properties', 'Different animals produce manure with varying nutrient contents. Compare cow, horse, chicken, and pig manure characteristics and learn proper handling techniques.', 3, 12),
  ('Manure Application Timing', 'When and how to apply manure for maximum benefit. Understand seasonal considerations, crop needs, and application rates to avoid over-fertilization.', 4, 14),
  ('Compost Tea Preparation', 'Create liquid fertilizer from compost to provide quick nutrition to plants. Learn brewing techniques, application methods, and troubleshooting common issues.', 5, 8),
  ('Vermicomposting Systems', 'Use earthworms to convert organic waste into high-quality compost. Set up worm bins, maintain proper conditions, and harvest worm castings.', 6, 12),
  ('Green Manure & Cover Crops', 'Grow plants specifically to improve soil fertility. Select appropriate species, timing for incorporation, and understand nitrogen fixation benefits.', 7, 10),
  ('Manure Storage & Safety', 'Proper storage prevents nutrient loss and environmental contamination. Learn about storage methods, safety protocols, and regulatory compliance.', 8, 10),
  ('Testing Soil & Manure Quality', 'Understand soil and manure testing procedures, interpret results, and adjust fertilization programs based on laboratory analysis.', 9, 12),
  ('Integrated Nutrient Management', 'Combine organic and mineral fertilizers for optimal plant nutrition while maintaining soil health and environmental sustainability.', 10, 15)
) AS l(title, content, order_index, duration_minutes)
WHERE c.title = 'Sustainable Manure Management';

-- Insert badges
INSERT INTO public.badges (chapter_id, name, description, icon, color)
SELECT c.id, b.name, b.description, b.icon, b.color
FROM public.chapters c
CROSS JOIN (VALUES 
  ('Water Wizard', 'Mastered all sustainable irrigation techniques', 'droplets', 'blue'),
  ('Manure Master', 'Expert in organic fertilization and composting', 'recycle', 'green'),
  ('Farming Pro', 'Completed sustainable farming practices', 'leaf', 'emerald'),
  ('Pest Guardian', 'Natural pest control specialist', 'bug', 'orange'),
  ('Soil Scientist', 'Soil health and conservation expert', 'mountain', 'purple')
) AS b(name, description, icon, color)
WHERE (c.title = 'Sustainable Irrigation' AND b.name = 'Water Wizard')
   OR (c.title = 'Sustainable Manure Management' AND b.name = 'Manure Master')
   OR (c.title = 'Sustainable Farming Practices' AND b.name = 'Farming Pro')
   OR (c.title = 'Organic Pest Control' AND b.name = 'Pest Guardian')
   OR (c.title = 'Soil Health & Conservation' AND b.name = 'Soil Scientist');