-- Create tests table for chapter tests
CREATE TABLE public.tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 80,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_questions table
CREATE TABLE public.test_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_test_attempts table
CREATE TABLE public.user_test_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  test_id UUID NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_test_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tests
CREATE POLICY "Tests are viewable by everyone" 
ON public.tests 
FOR SELECT 
USING (true);

-- Create RLS policies for test_questions
CREATE POLICY "Test questions are viewable by everyone" 
ON public.test_questions 
FOR SELECT 
USING (true);

-- Create RLS policies for user_test_attempts
CREATE POLICY "Users can view their own test attempts" 
ON public.user_test_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test attempts" 
ON public.user_test_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger for tests updated_at
CREATE TRIGGER update_tests_updated_at
BEFORE UPDATE ON public.tests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert test data for the 5 topics
-- First, get chapter IDs and insert tests
INSERT INTO public.tests (chapter_id, title, description) VALUES 
(
  (SELECT id FROM public.chapters WHERE title ILIKE '%sustainable irrigation%' LIMIT 1),
  'Sustainable Irrigation Mastery Test',
  'Test your knowledge of water-efficient irrigation techniques and systems.'
),
(
  (SELECT id FROM public.chapters WHERE title ILIKE '%manure%' LIMIT 1),
  'Sustainable Manure Management Test',
  'Assess your understanding of organic fertilization and waste management practices.'
),
(
  (SELECT id FROM public.chapters WHERE title ILIKE '%pest%' LIMIT 1),
  'Organic Pest Control Assessment',
  'Evaluate your knowledge of natural pest management strategies.'
),
(
  (SELECT id FROM public.chapters WHERE title ILIKE '%soil%' LIMIT 1),
  'Soil Health & Conservation Quiz',
  'Test your expertise in maintaining and improving soil quality.'
),
(
  (SELECT id FROM public.chapters WHERE title ILIKE '%farming practices%' LIMIT 1),
  'Sustainable Farming Practices Exam',
  'Comprehensive test on eco-friendly agricultural methods.'
);

-- Insert test questions for Sustainable Irrigation
INSERT INTO public.test_questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_answer, order_index) VALUES
((SELECT id FROM public.tests WHERE title = 'Sustainable Irrigation Mastery Test'), 'What percentage of water can drip irrigation save compared to traditional sprinkler systems?', '20-30%', '40-50%', '60-70%', '80-90%', 'B', 1),
((SELECT id FROM public.tests WHERE title = 'Sustainable Irrigation Mastery Test'), 'Which irrigation method delivers water directly to plant roots?', 'Flood irrigation', 'Drip irrigation', 'Overhead sprinklers', 'Furrow irrigation', 'B', 2),
((SELECT id FROM public.tests WHERE title = 'Sustainable Irrigation Mastery Test'), 'What is the main advantage of micro-sprinkler systems?', 'Uses more water', 'Reduces evaporation losses', 'Increases weed growth', 'More expensive to maintain', 'B', 3),
((SELECT id FROM public.tests WHERE title = 'Sustainable Irrigation Mastery Test'), 'When is the best time to irrigate crops to minimize water loss?', 'Noon', 'Early morning or evening', 'Mid-afternoon', 'Anytime during day', 'B', 4),
((SELECT id FROM public.tests WHERE title = 'Sustainable Irrigation Mastery Test'), 'What does soil moisture monitoring help farmers achieve?', 'Increase water usage', 'Optimize irrigation timing', 'Reduce crop yields', 'Speed up harvest', 'B', 5);

-- Insert test questions for Sustainable Manure Management
INSERT INTO public.test_questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_answer, order_index) VALUES
((SELECT id FROM public.tests WHERE title = 'Sustainable Manure Management Test'), 'What is composting in manure management?', 'Burning organic waste', 'Controlled decomposition of organic matter', 'Storing fresh manure', 'Mixing with chemicals', 'B', 1),
((SELECT id FROM public.tests WHERE title = 'Sustainable Manure Management Test'), 'How long should fresh manure typically be aged before use?', '1-2 weeks', '1-2 months', '3-6 months', '1 year', 'C', 2),
((SELECT id FROM public.tests WHERE title = 'Sustainable Manure Management Test'), 'What is the ideal carbon to nitrogen ratio for composting?', '10:1', '20:1', '30:1', '40:1', 'C', 3),
((SELECT id FROM public.tests WHERE title = 'Sustainable Manure Management Test'), 'Which nutrient is most abundant in well-composted manure?', 'Phosphorus', 'Potassium', 'Nitrogen', 'Calcium', 'C', 4),
((SELECT id FROM public.tests WHERE title = 'Sustainable Manure Management Test'), 'What is vermiculture in sustainable farming?', 'Growing worms for soil health', 'Using chemical fertilizers', 'Crop rotation technique', 'Water conservation method', 'A', 5);

-- Insert test questions for Organic Pest Control
INSERT INTO public.test_questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_answer, order_index) VALUES
((SELECT id FROM public.tests WHERE title = 'Organic Pest Control Assessment'), 'What is Integrated Pest Management (IPM)?', 'Using only pesticides', 'Combining multiple eco-friendly pest control methods', 'Eliminating all insects', 'Using chemical sprays only', 'B', 1),
((SELECT id FROM public.tests WHERE title = 'Organic Pest Control Assessment'), 'Which insects are considered beneficial in organic farming?', 'Aphids', 'Ladybugs and bees', 'Caterpillars', 'Termites', 'B', 2),
((SELECT id FROM public.tests WHERE title = 'Organic Pest Control Assessment'), 'What is companion planting?', 'Planting the same crop repeatedly', 'Growing different plants together for mutual benefit', 'Using synthetic fertilizers', 'Harvesting at the same time', 'B', 3),
((SELECT id FROM public.tests WHERE title = 'Organic Pest Control Assessment'), 'Which natural substance can repel many garden pests?', 'Sugar water', 'Neem oil', 'Salt water', 'Plain water', 'B', 4),
((SELECT id FROM public.tests WHERE title = 'Organic Pest Control Assessment'), 'What role do trap crops play in pest management?', 'Attract pests away from main crops', 'Increase pest population', 'Provide food for farmers', 'Improve soil fertility only', 'A', 5);

-- Insert test questions for Soil Health & Conservation
INSERT INTO public.test_questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_answer, order_index) VALUES
((SELECT id FROM public.tests WHERE title = 'Soil Health & Conservation Quiz'), 'What is crop rotation?', 'Turning crops upside down', 'Growing different crops in sequence', 'Harvesting multiple times', 'Using heavy machinery', 'B', 1),
((SELECT id FROM public.tests WHERE title = 'Soil Health & Conservation Quiz'), 'Which practice helps prevent soil erosion?', 'Removing all vegetation', 'Cover cropping', 'Deep tilling frequently', 'Using heavy machinery', 'B', 2),
((SELECT id FROM public.tests WHERE title = 'Soil Health & Conservation Quiz'), 'What does soil pH measure?', 'Soil temperature', 'Acidity or alkalinity', 'Moisture content', 'Nutrient density', 'B', 3),
((SELECT id FROM public.tests WHERE title = 'Soil Health & Conservation Quiz'), 'Which organisms are crucial for soil health?', 'Earthworms and microbes', 'Rats and mice', 'Large predators', 'Flying insects only', 'A', 4),
((SELECT id FROM public.tests WHERE title = 'Soil Health & Conservation Quiz'), 'What is no-till farming?', 'Never harvesting crops', 'Minimal soil disturbance', 'Using only hand tools', 'Planting without seeds', 'B', 5);

-- Insert test questions for Sustainable Farming Practices
INSERT INTO public.test_questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_answer, order_index) VALUES
((SELECT id FROM public.tests WHERE title = 'Sustainable Farming Practices Exam'), 'What is the main goal of sustainable agriculture?', 'Maximize short-term profits', 'Meet current needs without compromising future generations', 'Use as many chemicals as possible', 'Reduce crop diversity', 'B', 1),
((SELECT id FROM public.tests WHERE title = 'Sustainable Farming Practices Exam'), 'Which practice increases farm biodiversity?', 'Monoculture farming', 'Polyculture and intercropping', 'Using only synthetic inputs', 'Removing natural habitats', 'B', 2),
((SELECT id FROM public.tests WHERE title = 'Sustainable Farming Practices Exam'), 'What is agroforestry?', 'Cutting down all trees', 'Integrating trees with crops and livestock', 'Growing only forest trees', 'Using wood for fuel only', 'B', 3),
((SELECT id FROM public.tests WHERE title = 'Sustainable Farming Practices Exam'), 'How does sustainable farming help climate change?', 'Increases carbon emissions', 'Reduces carbon footprint and sequesters carbon', 'Has no impact on climate', 'Only affects local weather', 'B', 4),
((SELECT id FROM public.tests WHERE title = 'Sustainable Farming Practices Exam'), 'What is regenerative agriculture?', 'Farming that depletes soil', 'Practices that restore and improve ecosystem health', 'Using only old farming methods', 'Avoiding all modern techniques', 'B', 5);