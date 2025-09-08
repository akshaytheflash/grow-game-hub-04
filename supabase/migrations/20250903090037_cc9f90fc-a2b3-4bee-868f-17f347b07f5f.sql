-- First, let's check what chapters we have and get their IDs
-- Add lessons for Soil Health & Conservation chapter
INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Understanding Soil Biology',
  'Soil is a living ecosystem teeming with billions of microorganisms that form the foundation of healthy plant growth. In this lesson, we''ll explore the complex web of life beneath our feet.

**What Makes Soil Alive?**

Healthy soil contains:
- Bacteria (millions per gram) that break down organic matter
- Fungi that form networks connecting plant roots
- Protozoa that release nutrients by eating bacteria
- Nematodes that cycle nutrients and control pests
- Earthworms that create soil structure

**The Soil Food Web**

The soil food web is a complex system where:
1. Plants provide sugars to soil organisms through their roots
2. Microorganisms break down organic matter into plant-available nutrients
3. Predators control populations and release nutrients
4. All organisms work together to build soil structure

**Signs of Healthy Soil Biology**

- Dark, rich color from organic matter
- Earthy smell
- Good water infiltration
- Visible earthworms and insects
- Plants that are naturally resistant to pests and diseases

**Building Soil Biology**

- Add compost and organic matter regularly
- Minimize tillage to preserve fungal networks
- Plant diverse cover crops
- Avoid overuse of synthetic fertilizers and pesticides
- Maintain soil moisture but avoid waterlogging

Understanding and nurturing soil biology is the first step toward sustainable, productive farming that works with nature rather than against it.',
  1,
  15
FROM chapters c 
WHERE c.title = 'Soil Health & Conservation'
LIMIT 1;

INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Erosion Prevention Strategies',
  'Soil erosion is one of the greatest threats to agricultural productivity worldwide. In this lesson, we''ll learn practical strategies to protect and preserve our precious topsoil.

**Understanding Erosion**

Soil erosion occurs when wind or water removes topsoil faster than it can be naturally replaced. This process:
- Removes the most fertile layer of soil
- Reduces water-holding capacity
- Eliminates beneficial soil organisms
- Can take centuries to reverse naturally

**Water Erosion Prevention**

**Contour Farming:**
- Plant crops along the natural contours of slopes
- Reduces water runoff speed
- Creates natural barriers to soil movement

**Terracing:**
- Build stepped levels on steep slopes
- Dramatically reduces erosion on hillsides
- Increases water retention

**Cover Crops:**
- Plant crops specifically to protect soil
- Keep soil covered year-round
- Root systems hold soil in place
- Examples: winter rye, crimson clover, mustard

**Buffer Strips:**
- Plant grass or trees along waterways
- Filter runoff before it reaches streams
- Provide wildlife habitat

**Wind Erosion Prevention**

**Windbreaks:**
- Plant trees or shrubs to block wind
- Reduce wind speed by up to 50%
- Create microclimates for crops

**Crop Rotation:**
- Alternate between different crop types
- Maintains soil structure diversity
- Some crops build soil while others may deplete it

**No-Till Farming:**
- Avoid disturbing soil structure
- Maintains organic matter on surface
- Preserves soil organism habitats

**Maintenance Tips**

- Monitor erosion-prone areas regularly
- Repair any damage immediately
- Adjust strategies based on local conditions
- Combine multiple methods for best results

Remember: preventing erosion is much easier and cheaper than restoring eroded land.',
  2,
  20
FROM chapters c 
WHERE c.title = 'Soil Health & Conservation'
LIMIT 1;

INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Nutrient Management Systems',
  'Effective nutrient management ensures plants get what they need while protecting the environment and maintaining long-term soil fertility.

**Understanding Plant Nutrition**

Plants need 17 essential nutrients:

**Primary Nutrients (needed in large amounts):**
- Nitrogen (N): Promotes leafy growth, protein synthesis
- Phosphorus (P): Root development, flowering, fruiting
- Potassium (K): Disease resistance, water regulation

**Secondary Nutrients:**
- Calcium (Ca): Cell wall structure, pH buffering
- Magnesium (Mg): Chlorophyll center, enzyme activation
- Sulfur (S): Protein synthesis, oil production

**Micronutrients (needed in small amounts):**
Iron, manganese, zinc, copper, boron, molybdenum, chlorine, nickel

**Soil Testing: The Foundation**

Before adding any nutrients:
1. Test soil pH (affects nutrient availability)
2. Test nutrient levels
3. Assess organic matter content
4. Check soil texture and drainage

**Organic Nutrient Sources**

**Compost:**
- Slow-release nutrients
- Improves soil structure
- Adds beneficial microorganisms
- Apply 1-3 inches annually

**Animal Manures:**
- High in nitrogen and organic matter
- Must be properly composted to kill pathogens
- Different animals provide different nutrient ratios

**Green Manures/Cover Crops:**
- Legumes fix nitrogen from the air
- Deep-rooted crops bring up subsoil nutrients
- All cover crops add organic matter when decomposed

**Natural Mineral Amendments:**
- Rock phosphate: slow-release phosphorus
- Kelp meal: micronutrients and growth hormones
- Lime: raises pH, adds calcium
- Gypsum: adds calcium and sulfur without changing pH

**Integrated Nutrient Management**

**4R Principles:**
1. **Right Source:** Choose appropriate fertilizer type
2. **Right Rate:** Apply correct amount based on soil tests
3. **Right Time:** Apply when plants can use nutrients
4. **Right Place:** Put nutrients where roots can access them

**Timing Strategies:**
- Split applications to match plant uptake
- Apply slow-release sources early in season
- Use quick-release sources for immediate needs
- Time applications to avoid leaching

**Monitoring and Adjustment**

- Regular soil testing (every 2-3 years)
- Plant tissue testing during growing season
- Visual monitoring for deficiency symptoms
- Record keeping to track what works

**Environmental Considerations**

- Avoid over-application that leads to runoff
- Use buffer zones near water sources
- Consider groundwater protection
- Balance productivity with sustainability

Successful nutrient management is about feeding the soil ecosystem, not just the plants.',
  3,
  25
FROM chapters c 
WHERE c.title = 'Soil Health & Conservation'
LIMIT 1;

-- Add lessons for Organic Pest Control chapter
INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Integrated Pest Management Principles',
  'Integrated Pest Management (IPM) is a sustainable approach that combines multiple strategies to manage pests while minimizing risks to human health and the environment.

**What is IPM?**

IPM is not about eliminating all pests, but managing them at acceptable levels using the most effective, least risky methods. It follows a hierarchy of approaches:

1. **Prevention** (most important)
2. **Monitoring and identification**
3. **Control strategies** (when needed)
4. **Evaluation** of results

**The IPM Pyramid**

**Level 1: Cultural Controls (Foundation)**
- Crop rotation to break pest cycles
- Resistant varieties
- Proper plant spacing for air circulation
- Sanitation (removing crop debris)
- Optimal planting times
- Healthy soil management

**Level 2: Biological Controls**
- Beneficial insects (predators and parasites)
- Microbial pesticides (beneficial bacteria/fungi)
- Companion planting
- Habitat for beneficial organisms

**Level 3: Mechanical/Physical Controls**
- Row covers and barriers
- Traps (pheromone, sticky, light)
- Hand picking
- Cultivation for weed control
- Mulching

**Level 4: Chemical Controls (Last Resort)**
- Least toxic options first
- Targeted applications
- Proper timing
- Rotation to prevent resistance

**Monitoring and Thresholds**

**Economic Threshold:**
The pest level where control costs equal potential damage costs. Below this level, no action needed.

**Monitoring Methods:**
- Regular field scouting
- Sticky traps
- Pheromone traps
- Degree-day models
- Weather monitoring

**Record Keeping:**
- Pest levels over time
- Control methods used
- Effectiveness of treatments
- Weather conditions
- Beneficial insect populations

**Pest Identification**

**Key Questions:**
- Is it really a pest or beneficial?
- What life stage is present?
- What damage pattern do you see?
- What are the environmental conditions?

**Common Beneficial Insects (Don''t Kill These!):**
- Ladybugs (aphid predators)
- Lacewings (soft-bodied pest predators)
- Parasitic wasps (parasite many pests)
- Ground beetles (cutworm predators)
- Spiders (general predators)

**IPM Success Factors**

1. **Education:** Know your pests and beneficials
2. **Patience:** Let biological controls work
3. **Diversity:** Multiple crops and habitats
4. **Prevention:** Stop problems before they start
5. **Flexibility:** Adapt methods as needed

**Environmental Benefits**

- Reduced pesticide use
- Protected beneficial organisms
- Improved soil and water quality
- Enhanced biodiversity
- Sustainable long-term control

IPM requires more knowledge and planning than simply spraying pesticides, but it provides better long-term results with less environmental impact.',
  1,
  20
FROM chapters c 
WHERE c.title = 'Organic Pest Control'
LIMIT 1;

INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Natural Predators and Beneficial Insects',
  'Nature provides an army of beneficial insects that can help control pest populations. Learning to identify, attract, and protect these allies is key to successful organic pest management.

**Major Categories of Beneficial Insects**

**Predators (Hunt and Eat Pests):**

**Ladybugs (Lady Beetles):**
- Target: Aphids, scale insects, spider mites
- Identification: Round, colorful beetles (red, orange, yellow with spots)
- One larva can eat 400+ aphids during development
- Adults overwinter in garden debris

**Lacewings:**
- Target: Aphids, thrips, caterpillars, spider mites
- Identification: Delicate green or brown insects with lacy wings
- Larvae called "aphid lions" - voracious predators
- Adults feed mainly on pollen and nectar

**Ground Beetles:**
- Target: Cutworms, cabbage maggots, Colorado potato beetle larvae
- Identification: Dark, fast-moving beetles found under mulch
- Most active at night
- Cannot fly despite having wings

**Spiders:**
- Target: Flying insects, caterpillars, beetles
- All garden spiders are beneficial
- Provide continuous pest control
- Indicate healthy ecosystem balance

**Parasitoids (Lay Eggs in/on Pests):**

**Parasitic Wasps:**
- Target: Caterpillars, aphids, whiteflies, scale insects
- Identification: Tiny wasps (often smaller than pests they control)
- Do not sting humans
- Very host-specific

**Tachinid Flies:**
- Target: Caterpillars, beetle larvae, stink bugs
- Identification: Look like house flies but more bristly
- Larvae develop inside pest insects
- Adults feed on flowers

**Creating Beneficial Insect Habitat**

**Flower Resources:**
Plant flowers that bloom throughout the season:
- **Spring:** Sweet alyssum, calendula
- **Summer:** Cosmos, marigolds, zinnias
- **Fall:** Asters, goldenrod
- **Herbs:** Dill, fennel, parsley (let flower)

**Shelter Options:**
- Leave some garden areas "messy" for overwintering
- Provide mulch and ground cover
- Install insect hotels
- Maintain diverse plant heights and types

**Water Sources:**
- Shallow dishes with pebbles
- Dripping faucets
- Birdbaths with landing spots

**Managing for Beneficials**

**Avoid Broad-Spectrum Pesticides:**
- Even organic sprays can harm beneficials
- If spraying is necessary, target specific areas
- Spray in evening when beneficials are less active
- Read labels for effects on beneficial insects

**Accept Some Pest Damage:**
- Zero pest tolerance kills beneficial populations
- 5-10% damage is usually acceptable
- Beneficials need some pests to survive

**Plant Diversity:**
- Monocultures support pest outbreaks
- Mixed plantings support beneficial populations
- Include plants from different families

**Purchasing Beneficial Insects**

**When to Buy:**
- Specific pest problems with known beneficials
- Greenhouse or enclosed growing situations
- Supplement natural populations, don''t replace them

**Release Guidelines:**
- Release in evening or cloudy weather
- Ensure food sources are available
- Release when pest populations are present but not overwhelming
- Follow supplier instructions carefully

**Monitoring Success**

Look for signs of biological control working:
- Aphid "mummies" (parasitized aphids)
- Chewed pest insects
- Pest populations that rise then fall
- Presence of beneficial insect eggs and larvae

Remember: Building beneficial insect populations takes time, but provides long-term, sustainable pest control that improves each season.',
  2,
  18
FROM chapters c 
WHERE c.title = 'Organic Pest Control'
LIMIT 1;

INSERT INTO public.lessons (chapter_id, title, content, order_index, duration_minutes) 
SELECT 
  c.id,
  'Organic Pesticide Applications',
  'When prevention and biological controls aren''t sufficient, organic pesticides can provide targeted, environmentally-friendly pest management. Understanding proper selection, timing, and application is crucial for effectiveness and safety.

**Organic Pesticide Categories**

**Botanical Pesticides (Plant-Derived):**

**Neem Oil:**
- Source: Neem tree seeds
- Target: Soft-bodied insects, fungal diseases
- Mode of action: Disrupts insect feeding and development
- Application: Spray in evening, repeat every 7-14 days
- Benefits: Biodegrades quickly, low mammalian toxicity

**Pyrethrin:**
- Source: Chrysanthemum flowers
- Target: Flying insects, aphids, caterpillars
- Mode of action: Nervous system paralysis
- Application: Quick knockdown, short residual
- Note: Can harm beneficial insects, use sparingly

**Essential Oil Sprays:**
- Rosemary, thyme, peppermint oils
- Target: Aphids, spider mites, ants
- Mode of action: Repellent and contact toxicity
- Application: Dilute properly, test on small area first

**Microbial Pesticides:**

**Bacillus thuringiensis (Bt):**
- Source: Naturally occurring soil bacteria
- Target: Caterpillars (specific strains for different pests)
- Mode of action: Stomach poison for target insects
- Application: Spray when caterpillars are small and actively feeding
- Benefits: Highly specific, safe for beneficials

**Beauveria bassiana:**
- Source: Entomopathogenic fungus
- Target: Aphids, whiteflies, thrips, beetles
- Mode of action: Infects and kills insects
- Application: Requires high humidity to work
- Benefits: Can provide long-term control

**Mineral-Based Pesticides:**

**Diatomaceous Earth (DE):**
- Source: Fossilized aquatic organisms
- Target: Crawling insects with exoskeletons
- Mode of action: Physical damage to insect cuticle
- Application: Dust on dry surfaces, reapply after rain
- Note: Use food-grade only, avoid beneficial insects

**Kaolin Clay:**
- Source: Natural clay mineral
- Target: Many insects (acts as repellent/barrier)
- Mode of action: Forms protective film on plants
- Application: Spray to coat all plant surfaces
- Benefits: Also provides sun protection

**Soap and Oil Sprays:**

**Insecticidal Soap:**
- Target: Soft-bodied insects (aphids, spider mites)
- Mode of action: Dissolves insect cell membranes
- Application: Thorough coverage needed, spray undersides of leaves
- Benefits: Quick breakdown, relatively safe

**Horticultural Oil:**
- Target: Scale insects, aphids, spider mites, eggs
- Mode of action: Suffocates insects
- Application: Use dormant oil on dormant plants, summer oil on growing plants
- Note: Don''t apply in hot weather or to stressed plants

**Application Best Practices**

**Timing:**
- Early morning or evening (avoid heat and beneficial activity)
- Target pest''s most vulnerable life stage
- Apply preventively if pest pressure is predictable
- Don''t spray flowers when bees are active

**Coverage:**
- Read label rates carefully - more is not better
- Ensure thorough coverage, including leaf undersides
- Use appropriate nozzle for fine droplets
- Add spreader-sticker if recommended

**Weather Considerations:**
- Avoid windy conditions (drift to non-target areas)
- Don''t spray before rain (washoff)
- Temperature affects effectiveness and plant safety
- High humidity can enhance fungal pesticides

**Safety Measures**

**Personal Protection:**
- Wear appropriate protective equipment
- Long sleeves, pants, gloves, eye protection
- Avoid breathing spray mist
- Wash hands and face after application

**Environmental Protection:**
- Don''t spray near water sources
- Avoid drift to neighboring properties
- Consider impact on pollinators and beneficial insects
- Store pesticides safely away from children and pets

**Resistance Management**

- Rotate different modes of action
- Don''t rely on single products
- Use lowest effective rate
- Combine with non-chemical methods
- Monitor for reduced effectiveness

**Record Keeping**

Document all applications:
- Product used and rate
- Date and weather conditions
- Target pest and population level
- Results observed
- Any adverse effects

Remember: Organic pesticides are tools in an integrated system, not silver bullets. Always start with the least toxic option and use pesticides as part of a comprehensive IPM approach.',
  3,
  22
FROM chapters c 
WHERE c.title = 'Organic Pest Control'
LIMIT 1;