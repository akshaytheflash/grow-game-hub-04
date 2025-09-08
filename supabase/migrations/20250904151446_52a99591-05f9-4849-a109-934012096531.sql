-- Insert sample daily quests
INSERT INTO public.quests (title, description, points, quest_type, emoji, icon, is_active, order_index) VALUES
('Save 10 liters of water', 'Practice water conservation in your farming activities', 5, 'daily', '💧', 'Droplets', true, 1),
('Check soil moisture', 'Monitor and record soil moisture levels', 5, 'daily', '🌱', 'Leaf', true, 2),
('Switch off unused equipment', 'Turn off farming equipment when not in use to save energy', 5, 'daily', '⚡', 'Zap', true, 3),
('Spot a pollinator insect', 'Observe and document beneficial insects in your farm', 5, 'daily', '🐝', 'Bug', true, 4),
('Compost organic waste', 'Turn organic farm waste into valuable compost', 5, 'daily', '🌍', 'Recycle', true, 5);

-- Insert sample weekly quests
INSERT INTO public.quests (title, description, points, quest_type, emoji, icon, is_active, order_index) VALUES
('Plant 5 saplings', 'Contribute to reforestation by planting tree saplings', 25, 'weekly', '🌱', 'Sprout', true, 1),
('Reduce fertilizer by 10%', 'Implement sustainable practices to reduce chemical fertilizer usage', 20, 'weekly', '🌿', 'Sprout', true, 2),
('Use renewable energy for 2 activities', 'Power your farming activities with solar or other renewable energy', 25, 'weekly', '☀️', 'Sun', true, 3),
('Introduce eco-friendly pest control', 'Use biological or organic methods for pest management', 20, 'weekly', '🛡️', 'ShieldCheck', true, 4),
('Record weekly water usage', 'Track and analyze your water consumption patterns', 15, 'weekly', '📊', 'BarChart3', true, 5);