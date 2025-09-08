-- Add comprehensive sustainable farming lessons with engaging content

-- Lesson 1: Sustainable Irrigation 💧
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  content,
  order_index,
  duration_minutes
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.chapters WHERE title = 'Sustainable Farming Practices'),
  'Sustainable Irrigation 💧',
  '## Introduction 🌱
Water is our most precious resource! Sustainable irrigation helps farmers grow more food while using less water, protecting our environment for future generations.

## Key Practices 🚿

### 1. Drip Irrigation Systems
- Delivers water directly to plant roots
- Reduces water waste by 30-50%
- Perfect for vegetables and fruit trees

### 2. Soil Moisture Monitoring
- Use sensors to check soil wetness
- Water only when plants actually need it
- Prevents overwatering and root rot

### 3. Rainwater Harvesting
- Collect and store rainwater in tanks
- Free water source during dry seasons
- Reduces dependency on groundwater

### 4. Mulching
- Cover soil with organic materials
- Retains moisture and reduces evaporation
- Keeps soil cool and suppresses weeds

## Quick Eco Tips 🌍
• Install rain gauges to track natural water supply
• Water early morning or late evening to reduce evaporation
• Use drought-resistant crop varieties
• Create swales and berms to capture runoff
• Group plants with similar water needs together

## Weekly Challenge 🏆
**Week 1 Challenge: Water Wise Farmer**
Install a simple drip irrigation system for at least 10 plants in your garden. Monitor and record water usage for one week. Compare with traditional watering methods.

*Reward: "Water Guardian" badge 💧*

## Quiz Time! 🧠
**Question: What percentage of water can drip irrigation save compared to traditional sprinklers?**
A) 10-20%
B) 30-50% ✅
C) 60-80%

**Correct Answer: B) 30-50%**
Drip irrigation is highly efficient because it delivers water directly to the root zone, minimizing evaporation and runoff losses.

## Success Story 🌟
**Maria from Kenya** transformed her 2-acre farm using drip irrigation and rainwater harvesting. "Before, I used 500 liters daily for my tomatoes. Now I use only 200 liters and my harvest increased by 40%! The system paid for itself in just 6 months. My neighbors are copying my methods now!" 🍅

*Key Lesson: Small investments in sustainable irrigation can lead to big savings and better yields.*',
  1,
  15
);

-- Lesson 2: Sustainable Manure Management 🐄
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  content,
  order_index,
  duration_minutes
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.chapters WHERE title = 'Sustainable Farming Practices'),
  'Sustainable Manure Management 🐄',
  '## Introduction 🌱
Animal manure is "brown gold" for farmers! When managed properly, it becomes a powerful natural fertilizer that builds healthy soil and reduces the need for chemical inputs.

## Key Practices 🚜

### 1. Composting Systems
- Mix manure with dry organic matter (straw, leaves)
- Turn pile every 2-3 weeks for proper decomposition
- Ready in 3-6 months when dark and crumbly

### 2. Proper Storage
- Keep manure covered to prevent nutrient loss
- Store on concrete pad to avoid groundwater contamination
- Use tarps or roofed storage areas

### 3. Application Timing
- Apply in spring before planting season
- Avoid application before heavy rains
- Never apply to frozen or waterlogged soil

### 4. Liquid Manure Management
- Dilute fresh liquid manure (1:10 water ratio)
- Apply through irrigation systems
- Perfect for quick nutrient boost

## Quick Eco Tips 🌍
• Test soil before applying manure to avoid over-fertilization
• Mix different animal manures for balanced nutrients
• Add biochar to compost for carbon sequestration
• Use manure tea for gentle liquid fertilization
• Create buffer zones near water sources

## Weekly Challenge 🏆
**Week 2 Challenge: Compost Master**
Start a small compost pile using available animal manure and organic waste. Monitor temperature and moisture levels. Document the decomposition process with photos.

*Reward: "Compost Champion" badge 🥇*

## Quiz Time! 🧠
**Question: What is the ideal carbon-to-nitrogen ratio for composting manure?**
A) 15:1
B) 30:1 ✅
C) 50:1

**Correct Answer: B) 30:1**
The ideal C:N ratio ensures proper decomposition without odor problems. Too much nitrogen creates ammonia smell, too much carbon slows decomposition.

## Success Story 🌟
**Carlos from Brazil** manages 50 cattle and turned manure management into profit. "I built a simple composting system with three bins. Now I sell high-quality compost to local gardeners for $50 per cubic meter. What was once waste generates $3,000 extra income yearly, plus my pastures are healthier than ever!" 🐄💰

*Key Lesson: Waste becomes wealth with proper manure management systems.*',
  2,
  12
);

-- Lesson 3: Soil Health & Conservation 🌍
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  content,
  order_index,
  duration_minutes
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.chapters WHERE title = 'Sustainable Farming Practices'),
  'Soil Health & Conservation 🌍',
  '## Introduction 🌱
Healthy soil is the foundation of sustainable farming! It''s a living ecosystem teeming with billions of microorganisms that help plants grow strong and resist diseases.

## Key Practices 🌾

### 1. Cover Cropping
- Plant crops like clover, rye, or vetch during off-season
- Prevents soil erosion and adds organic matter
- Fixes nitrogen naturally (legumes)

### 2. Crop Rotation
- Rotate different crop families each season
- Breaks pest and disease cycles
- Balances soil nutrients naturally

### 3. Minimal Tillage
- Reduce soil disturbance to preserve structure
- Use no-till or strip-till methods
- Maintains beneficial soil organisms

### 4. Organic Matter Addition
- Add compost, aged manure, or biochar
- Improves soil structure and water retention
- Feeds beneficial microorganisms

## Quick Eco Tips 🌍
• Test soil pH annually and adjust with lime or sulfur
• Create permanent pathways to avoid soil compaction
• Use living mulches between crop rows
• Establish windbreaks to prevent erosion
• Monitor earthworm populations as soil health indicators

## Weekly Challenge 🏆
**Week 3 Challenge: Soil Detective**
Conduct a simple soil health assessment: dig soil profiles, count earthworms, test pH, and observe soil structure. Create a soil improvement plan based on findings.

*Reward: "Soil Scientist" badge 🔬*

## Quiz Time! 🧠
**Question: How much soil does the world lose to erosion each year?**
A) 12 billion tons
B) 24 billion tons ✅
C) 36 billion tons

**Correct Answer: B) 24 billion tons**
Soil erosion is a global crisis. It takes 500-1000 years to form just 2.5cm of topsoil, but we can lose it in a single storm without proper conservation.

## Success Story 🌟
**Ahmed from Morocco** rehabilitated 20 hectares of degraded land using cover crops and composting. "My grandfather''s farm was almost desert when I inherited it. After 5 years of soil conservation practices, organic matter increased from 0.5% to 3.2%. Now I grow olives, almonds, and vegetables where nothing would grow before. The land came back to life!" 🌳

*Key Lesson: Patient soil building creates lasting agricultural success.*',
  3,
  18
);

-- Lesson 4: Renewable Energy in Farming 🔆
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  content,
  order_index,
  duration_minutes
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.chapters WHERE title = 'Sustainable Farming Practices'),
  'Renewable Energy in Farming 🔆',
  '## Introduction 🌱
Clean energy powers the future of farming! Solar, wind, and biogas technologies help farmers reduce costs, increase independence, and fight climate change.

## Key Technologies ⚡

### 1. Solar Power Systems
- Solar panels for irrigation pumps and lighting
- Reduces electricity bills by 70-90%
- Works well in rural areas with abundant sunshine

### 2. Small Wind Turbines
- Generate power for water pumping and equipment
- Ideal for windy agricultural areas
- Low maintenance once installed

### 3. Biogas from Organic Waste
- Convert animal manure and crop residues to methane
- Provides cooking fuel and electricity
- Produces nutrient-rich slurry for fertilizer

### 4. Micro-Hydropower
- Use streams or irrigation channels for power
- Reliable 24/7 energy source
- Perfect for remote mountain farms

## Quick Eco Tips 🌍
• Start small with solar water heating or lighting
• Combine renewable systems for reliable power
• Use energy-efficient LED lighting in barns
• Install battery storage for nighttime use
• Consider solar-powered electric fencing

## Weekly Challenge 🏆
**Week 4 Challenge: Energy Pioneer**
Calculate your farm''s energy needs and design a basic renewable energy system. Research costs and potential savings. Present your plan to family or neighbors.

*Reward: "Green Energy Farmer" badge ⚡*

## Quiz Time! 🧠
**Question: How much can solar irrigation systems reduce pumping costs?**
A) 20-40%
B) 50-70%
C) 70-90% ✅

**Correct Answer: C) 70-90%**
Solar irrigation systems have very low operating costs after installation since sunlight is free, making them extremely cost-effective in sunny regions.

## Success Story 🌟
**Priya from India** installed solar panels to power her dairy farm''s milking equipment and cooling systems. "The initial investment was scary - $5,000 for solar panels. But now I save $150 monthly on electricity! In 3 years, the system paid for itself. During power outages, my dairy operates normally while neighbors struggle. My milk quality improved too because of consistent cooling!" 🥛☀️

*Key Lesson: Renewable energy investments provide long-term financial and operational benefits.*',
  4,
  14
);

-- Lesson 5: Organic Pest Control 🐛
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  content,
  order_index,
  duration_minutes
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.chapters WHERE title = 'Sustainable Farming Practices'),
  'Organic Pest Control 🐛',
  '## Introduction 🌱
Nature has its own pest control army! Organic methods work with natural systems to manage pests while protecting beneficial insects, soil health, and human safety.

## Key Strategies 🦋

### 1. Beneficial Insects
- Attract ladybugs, lacewings, and parasitic wasps
- Plant flowers like marigolds, dill, and yarrow
- Provide shelter with diverse plantings

### 2. Companion Planting
- Plant basil with tomatoes to repel aphids
- Use garlic and chives around roses
- Interplant trap crops to confuse pests

### 3. Natural Sprays
- Neem oil for soft-bodied insects
- Soap sprays for aphids and mites
- Bacillus thuringiensis (Bt) for caterpillars

### 4. Physical Barriers
- Row covers for flying insects
- Copper tape for slugs and snails
- Sticky traps for monitoring and control

## Quick Eco Tips 🌍
• Encourage birds with nesting boxes and water sources
• Remove diseased plant material promptly
• Use reflective mulches to confuse flying pests
• Rotate crops to break pest life cycles
• Time planting to avoid peak pest seasons

## Weekly Challenge 🏆
**Week 5 Challenge: Beneficial Habitat Creator**
Create a "beneficial insect hotel" using natural materials. Plant at least 3 flowers that attract beneficial insects. Monitor and photograph visitors over one week.

*Reward: "Eco Pest Warrior" badge 🛡️*

## Quiz Time! 🧠
**Question: What percentage of insects are actually beneficial or neutral to crops?**
A) 50%
B) 75%
C) 97% ✅

**Correct Answer: C) 97%**
Less than 3% of insects are agricultural pests! The vast majority are beneficial predators, pollinators, or decomposers that help maintain healthy ecosystems.

## Success Story 🌟
**Elena from California** eliminated pesticide use on her 5-acre vegetable farm using integrated organic methods. "I was spending $2,000 yearly on chemicals and still losing 20% of crops to pests. Now I use beneficial insects, companion planting, and organic sprays. My input costs dropped to $300, crop losses decreased to 8%, and customers pay premium prices for ''pesticide-free'' vegetables. Plus, my farm buzzes with life - bees, butterflies, and birds everywhere!" 🦋🌻

*Key Lesson: Working with nature creates more effective and profitable pest management.*',
  5,
  16
);