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
('Gujarat • Vegetables', 'Vegetable farmers in Gujarat sharing tips and experiences', 'Gujarat, India', 'vegetables', (SELECT user_id FROM profiles LIMIT 1), 25),
('Maharashtra • Cotton', 'Cotton farming community in Maharashtra', 'Maharashtra, India', 'cotton', (SELECT user_id FROM profiles LIMIT 1), 18),
('Organic • Mixed', 'Organic farmers growing mixed crops across regions', 'Multi-region', 'mixed', (SELECT user_id FROM profiles LIMIT 1), 32);

-- Insert sample community challenges
INSERT INTO public.community_challenges (title, description, challenge_type, target_value, unit, start_date, end_date, participant_count) VALUES
('Water Conservation Challenge', 'Save 10,000 liters of water this month through efficient irrigation', 'water_saving', 10000, 'liters', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 0),
('Organic Transition Challenge', 'Transition 100 hectares to organic farming practices', 'organic_transition', 100, 'hectares', CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', 0),
('Seed Sharing Initiative', 'Share 500 seed packets among community members', 'seed_sharing', 500, 'packets', CURRENT_DATE, CURRENT_DATE + INTERVAL '45 days', 0);

-- Insert sample posts
INSERT INTO public.community_posts (title, content, post_type, crop_type, user_id) VALUES
('Drip Irrigation Success Story', 'Switched to drip irrigation last month and already seeing 30% water savings! The setup was easier than expected and my tomato yield has increased too. Happy to share details with anyone interested.', 'update', 'vegetables', (SELECT user_id FROM profiles LIMIT 1)),
('Organic Pest Control Tip', 'Mix neem oil with water (1:20 ratio) and spray early morning. Works great against aphids and whiteflies. Been using this for 2 years with excellent results on my cotton crop.', 'tip', 'cotton', (SELECT user_id FROM profiles LIMIT 1)),
('From Struggling to Thriving', 'My field transformation over 6 months using sustainable practices. Left image shows poor soil condition, right shows healthy growth after compost and cover cropping.', 'photo_story', 'mixed', (SELECT user_id FROM profiles LIMIT 1));

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