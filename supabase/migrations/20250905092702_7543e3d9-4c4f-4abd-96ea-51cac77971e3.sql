-- Add missing post_type enum values
ALTER TYPE post_type ADD VALUE IF NOT EXISTS 'update';
ALTER TYPE post_type ADD VALUE IF NOT EXISTS 'tip';
ALTER TYPE post_type ADD VALUE IF NOT EXISTS 'photo_story';

-- Insert sample badges for the community
INSERT INTO public.badges (name, description, icon, chapter_id, color) VALUES
('Soil Guardian', 'Awarded for 5+ soil health posts or tips', '🌱', (SELECT id FROM chapters LIMIT 1), 'green'),
('Water Saver', 'Awarded for consistent water-saving tips', '💧', (SELECT id FROM chapters LIMIT 1), 'blue'),
('Pollinator Protector', 'Awarded for biodiversity/pollinator-focused posts', '🐝', (SELECT id FROM chapters LIMIT 1), 'yellow'),
('Eco Mentor', 'Awarded for mentoring or answering 10+ community questions', '🌍', (SELECT id FROM chapters LIMIT 1), 'emerald'),
('Renewable Champion', 'Awarded for promoting renewable energy practices', '🔋', (SELECT id FROM chapters LIMIT 1), 'purple'),
('Storyteller', 'Awarded for 3+ photo story posts', '📸', (SELECT id FROM chapters LIMIT 1), 'pink');

-- Insert sample community posts
INSERT INTO public.community_posts (title, content, post_type, crop_type, user_id) VALUES
('Drip Irrigation Success Story', 'Switched to drip irrigation last month and already seeing 30% water savings! The setup was easier than expected and my tomato yield has increased too. Happy to share details with anyone interested.', 'update', 'vegetables', (SELECT user_id FROM profiles LIMIT 1)),
('Organic Pest Control Tip', 'Mix neem oil with water (1:20 ratio) and spray early morning. Works great against aphids and whiteflies. Been using this for 2 years with excellent results on my cotton crop.', 'tip', 'cotton', (SELECT user_id FROM profiles LIMIT 1)),
('From Struggling to Thriving', 'My field transformation over 6 months using sustainable practices. Left image shows poor soil condition, right shows healthy growth after compost and cover cropping.', 'photo_story', 'mixed', (SELECT user_id FROM profiles LIMIT 1));