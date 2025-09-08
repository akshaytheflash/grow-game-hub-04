-- Add comprehensive lesson content for Sustainable Farming Practices chapter

-- Update the main lesson with engaging content including intro, practices, tips, quiz, challenge, and success story
UPDATE lessons 
SET content = '# 🌱 Sustainable Farming: Growing for Tomorrow

## Why Sustainability Matters 🌍

Sustainable farming isn''t just a trend—it''s the future of agriculture! As our global population grows to 9.7 billion by 2050, we need farming methods that:
- Protect our precious soil and water resources 💧
- Maintain biodiversity and ecosystem health 🦋
- Provide economic stability for farmers 💰
- Ensure food security for future generations 🌾

Traditional intensive farming has given us abundance, but at a cost. Sustainable practices help us farm smarter, not harder!

## 🔑 Key Sustainable Practices

### 1. Crop Rotation 🔄
**What it is**: Systematically changing crops in the same field across seasons/years
**Benefits**: 
- Breaks pest and disease cycles
- Improves soil nutrients naturally
- Reduces need for chemical inputs
**Example**: Corn → Soybeans → Wheat → Cover crop

### 2. Organic Fertilizers 🌿
**What it is**: Using natural materials to feed soil and plants
**Types**: Compost, manure, bone meal, kelp meal
**Benefits**:
- Builds long-term soil health
- Releases nutrients slowly
- Improves soil structure and water retention

### 3. Water-Smart Irrigation 💧
**What it is**: Efficient water use through precision techniques
**Methods**: Drip irrigation, micro-sprinklers, soil moisture sensors
**Benefits**:
- Reduces water waste by 30-50%
- Prevents overwatering and root diseases
- Lowers energy costs

### 4. Agroforestry 🌳
**What it is**: Integrating trees and shrubs into farming systems
**Examples**: 
- Alley cropping (trees between crop rows)
- Silvopasture (trees in grazing areas)
- Windbreaks and buffer strips
**Benefits**: Carbon sequestration, biodiversity, wind protection

## 🌿 Quick Eco Tips

• **Start small**: Begin with one sustainable practice and expand gradually
• **Observe nature**: Mimic natural ecosystems in your farming approach  
• **Test your soil**: Regular soil testing guides sustainable nutrient management
• **Plant native species**: Native plants require less water and support local wildlife
• **Reduce tillage**: Minimize soil disturbance to preserve soil structure and organisms

## 🧠 Knowledge Check Quiz

**Question**: Which sustainable practice provides the MOST benefits for soil health, pest control, AND nutrient management?

A) Organic fertilizers only
B) Crop rotation system ✅
C) Drip irrigation only

**Correct Answer**: B) Crop rotation system
**Why**: Crop rotation addresses multiple challenges simultaneously—it breaks pest cycles, adds nitrogen through legumes, prevents soil depletion, and reduces chemical dependency.

## 🏆 Weekly Challenge: "Sustainability Scout"

**Your Mission**: Identify 3 areas on your farm where you can implement sustainable practices this week.

**Tasks**:
1. Map one area suitable for crop rotation planning
2. Test soil pH in a target field
3. Calculate water usage in one irrigation zone
4. Identify one spot for potential tree planting

**Badge Reward**: 🌱 **Eco Pioneer Badge**
*"Taking the first steps toward sustainable farming excellence"*

**Share your progress**: Post photos of your sustainability assessment with #SustainabilityScout

## 👨‍🌾 Success Story: Maria''s Transformation

**Meet Maria Rodriguez** from Sonora, Mexico 🇲🇽

*"Three years ago, my 5-hectare farm was struggling. High input costs, declining yields, and water scarcity were threatening my family''s livelihood."*

**What Maria Changed**:
- Implemented 4-crop rotation system
- Built on-farm compost operation  
- Installed drip irrigation system
- Planted windbreak trees

**Results After 2 Years**:
- 💰 40% reduction in input costs
- 🌾 25% increase in yields
- 💧 50% water savings
- 🌱 Improved soil organic matter from 1.2% to 2.8%

*"Sustainable farming saved my farm and gave my children a future. The initial investment paid for itself in 18 months, and now I''m teaching other farmers in my community!"*

---

**Remember**: Sustainable farming is a journey, not a destination. Every small step toward sustainability creates positive ripple effects for your farm, community, and planet! 🌍✨'
WHERE chapter_id = '1e7b5594-579f-4202-80cf-315b59b2ffa0'
AND order_index = 1;

-- Add a second lesson for advanced sustainable techniques
INSERT INTO lessons (chapter_id, title, content, order_index, duration_minutes) 
VALUES (
  '1e7b5594-579f-4202-80cf-315b59b2ffa0',
  'Advanced Sustainable Techniques',
  '# 🔬 Advanced Sustainable Techniques

## Carbon Farming & Soil Sequestration 🌱
Learn how your farm can become a carbon sink while improving productivity!

### Cover Crops Revolution
- **Winter rye**: Prevents erosion, adds organic matter
- **Crimson clover**: Fixes nitrogen naturally 
- **Radishes**: Break soil compaction with deep taproots

### No-Till Benefits
- Preserves soil structure and mycorrhizal networks
- Reduces fuel costs by 50-70%
- Increases water infiltration rates

## 🦋 Biodiversity & Beneficial Insects

### Creating Habitat Corridors
- Plant native flowering strips between fields
- Maintain hedgerows and field margins
- Install bee houses and beneficial insect hotels

### Integrated Pest Management (IPM)
- Monitor pest populations weekly
- Use beneficial insects as natural predators
- Apply treatments only when economic thresholds are reached

## 📊 Measuring Success

### Key Performance Indicators (KPIs):
- Soil organic matter percentage
- Water use efficiency (kg/m³)
- Biodiversity index scores
- Economic returns per hectare

### Technology Tools:
- Soil moisture sensors
- Drone crop monitoring
- GPS-guided variable rate application
- Weather station data integration

## 🎯 Implementation Roadmap

**Year 1**: Soil testing, cover crops, basic IPM
**Year 2**: Diversification, beneficial habitat creation  
**Year 3**: Technology integration, certification pursuit
**Year 4+**: Mentoring others, continuous optimization

*Sustainable farming is about working WITH nature, not against it!* 🌿🤝',
  2,
  12
);

-- Add a third lesson focused on economic sustainability
INSERT INTO lessons (chapter_id, title, content, order_index, duration_minutes) 
VALUES (
  '1e7b5594-579f-4202-80cf-315b59b2ffa0',
  'Economic Sustainability & Certification',
  '# 💰 Making Sustainability Profitable

## 🏷️ Certification Pathways

### Organic Certification
- Premium prices: 20-40% above conventional
- Growing market demand
- 3-year transition period required

### Regenerative Agriculture Certification
- Focus on soil health improvement
- Carbon credit opportunities
- Brand differentiation advantages

## 📈 Financial Planning for Transition

### Investment Timeline:
**Year 1**: -15% (transition costs)
**Year 2**: -5% (learning curve)  
**Year 3**: +10% (efficiency gains)
**Year 4+**: +20-30% (full benefits)

### Funding Sources:
- Government sustainability grants
- Carbon credit programs
- Cooperative cost-sharing
- Equipment leasing programs

## 🌐 Market Opportunities

### Direct-to-Consumer Sales
- Farmers markets: Build relationships
- Community Supported Agriculture (CSA)
- Online farm stores and delivery

### Value-Added Products
- On-farm processing capabilities
- Agritourism integration
- Educational workshop offerings

## 🤝 Building Resilient Communities

*Sustainable farming creates stronger rural communities through:*
- Local food system development
- Knowledge sharing networks
- Collaborative equipment purchases
- Mentorship programs

**Your sustainable journey enriches more than just your soil—it strengthens entire communities!** 🌾👥',
  3,
  10
);