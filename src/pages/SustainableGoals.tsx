import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { ArrowLeft, Target, CheckCircle, Clock, TrendingUp, Leaf, Droplets, Recycle, Zap, Globe, Sprout, Sun, Scissors, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SustainableGoals = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const crops = [
    {
      id: "tomato",
      name: "Tomatoes",
      icon: "🍅",
      growthTime: "75-85 days",
      difficulty: "Beginner",
      waterNeeds: "Medium",
      waterAmount: "1-2 inches per week",
      weatherType: "Warm & Sunny",
      temperature: "65-75°F",
      humidity: "50-70%",
      yield: "10-15 lbs per plant",
      category: "Vegetables",
      stages: [
        { name: "Seed Planting", duration: "Day 1-7", description: "Plant seeds in nutrient-rich soil with proper spacing", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 7-14", description: "Seeds sprout and first leaves appear", icon: Leaf, progress: 15 },
        { name: "Vegetative Growth", duration: "Day 14-45", description: "Plant develops strong stems and abundant foliage", icon: Sun, progress: 50 },
        { name: "Flowering", duration: "Day 45-60", description: "Yellow flowers bloom, beginning fruit development", icon: Sun, progress: 70 },
        { name: "Fruit Development", duration: "Day 60-75", description: "Green tomatoes form and begin to mature", icon: Droplets, progress: 85 },
        { name: "Harvest", duration: "Day 75-85", description: "Ripe tomatoes ready for harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "wheat",
      name: "Wheat",
      icon: "🌾",
      growthTime: "120-150 days",
      difficulty: "Intermediate",
      waterNeeds: "Medium",
      waterAmount: "1-1.5 inches per week",
      weatherType: "Cool & Dry",
      temperature: "50-70°F",
      humidity: "40-60%",
      yield: "30-60 bushels per acre",
      category: "Grains",
      stages: [
        { name: "Seed Planting", duration: "Day 1-10", description: "Plant seeds in well-prepared fields", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 10-21", description: "Seeds emerge and establish root systems", icon: Leaf, progress: 14 },
        { name: "Tillering", duration: "Day 21-60", description: "Multiple shoots develop from each plant", icon: Sun, progress: 40 },
        { name: "Stem Extension", duration: "Day 60-90", description: "Stems elongate and nodes develop", icon: Sun, progress: 60 },
        { name: "Heading", duration: "Day 90-120", description: "Wheat heads emerge and fill with grain", icon: Droplets, progress: 80 },
        { name: "Harvest", duration: "Day 120-150", description: "Golden wheat ready for harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "rice",
      name: "Rice",
      icon: "🌾",
      growthTime: "100-130 days",
      difficulty: "Advanced",
      waterNeeds: "Very High",
      waterAmount: "3-5 inches per week",
      weatherType: "Hot & Humid",
      temperature: "75-85°F",
      humidity: "80-90%",
      yield: "150-200 bushels per acre",
      category: "Grains",
      stages: [
        { name: "Seed Preparation", duration: "Day 1-5", description: "Seeds soaked and pre-germinated", icon: Sprout, progress: 0 },
        { name: "Transplanting", duration: "Day 5-15", description: "Seedlings transplanted to flooded fields", icon: Leaf, progress: 12 },
        { name: "Vegetative Growth", duration: "Day 15-60", description: "Rapid growth in flooded conditions", icon: Sun, progress: 46 },
        { name: "Reproductive Phase", duration: "Day 60-90", description: "Panicle formation and flowering", icon: Sun, progress: 69 },
        { name: "Grain Filling", duration: "Day 90-120", description: "Rice grains develop and mature", icon: Droplets, progress: 92 },
        { name: "Harvest", duration: "Day 100-130", description: "Golden rice ready for harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "corn",
      name: "Sweet Corn",
      icon: "🌽",
      growthTime: "90-120 days",
      difficulty: "Intermediate",
      waterNeeds: "High",
      waterAmount: "2-3 inches per week",
      weatherType: "Hot & Humid",
      temperature: "75-85°F",
      humidity: "70-85%",
      yield: "2-3 ears per plant",
      category: "Grains",
      stages: [
        { name: "Seed Planting", duration: "Day 1-7", description: "Plant kernels in deep, rich soil", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 7-14", description: "Shoots emerge and begin rapid growth", icon: Leaf, progress: 12 },
        { name: "Vegetative Growth", duration: "Day 14-60", description: "Tall stalks develop with large leaves", icon: Sun, progress: 50 },
        { name: "Tasseling", duration: "Day 60-75", description: "Tassels appear at top, silks emerge", icon: Sun, progress: 65 },
        { name: "Grain Fill", duration: "Day 75-100", description: "Kernels develop and fill with starch", icon: Droplets, progress: 85 },
        { name: "Harvest", duration: "Day 90-120", description: "Sweet, plump ears ready for harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "potato",
      name: "Potatoes",
      icon: "🥔",
      growthTime: "80-100 days",
      difficulty: "Beginner",
      waterNeeds: "Medium",
      waterAmount: "1-2 inches per week",
      weatherType: "Cool & Moist",
      temperature: "60-70°F",
      humidity: "60-80%",
      yield: "10-20 lbs per plant",
      category: "Vegetables",
      stages: [
        { name: "Planting", duration: "Day 1-10", description: "Plant seed potatoes in hills", icon: Sprout, progress: 0 },
        { name: "Sprouting", duration: "Day 10-21", description: "Green shoots emerge from soil", icon: Leaf, progress: 21 },
        { name: "Vegetative Growth", duration: "Day 21-50", description: "Foliage develops, tubers begin forming", icon: Sun, progress: 50 },
        { name: "Tuber Development", duration: "Day 50-80", description: "Potatoes grow underground", icon: Droplets, progress: 80 },
        { name: "Harvest", duration: "Day 80-100", description: "Mature potatoes ready to dig", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "soybean",
      name: "Soybeans",
      icon: "🫘",
      growthTime: "100-140 days",
      difficulty: "Intermediate",
      waterNeeds: "Medium",
      waterAmount: "1.5-2 inches per week",
      weatherType: "Warm & Humid",
      temperature: "70-80°F",
      humidity: "60-75%",
      yield: "40-60 bushels per acre",
      category: "Legumes",
      stages: [
        { name: "Planting", duration: "Day 1-7", description: "Plant seeds in prepared soil", icon: Sprout, progress: 0 },
        { name: "Emergence", duration: "Day 7-14", description: "Cotyledons emerge from soil", icon: Leaf, progress: 10 },
        { name: "Vegetative Growth", duration: "Day 14-60", description: "Leaves and branches develop", icon: Sun, progress: 43 },
        { name: "Flowering", duration: "Day 60-80", description: "Small white/purple flowers appear", icon: Sun, progress: 57 },
        { name: "Pod Development", duration: "Day 80-120", description: "Pods form and beans develop", icon: Droplets, progress: 86 },
        { name: "Harvest", duration: "Day 100-140", description: "Mature beans ready for harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "lettuce",
      name: "Lettuce",
      icon: "🥬",
      growthTime: "45-65 days",
      difficulty: "Beginner",
      waterNeeds: "High",
      waterAmount: "1.5-2.5 inches per week",
      weatherType: "Cool & Mild",
      temperature: "45-65°F",
      humidity: "60-80%",
      yield: "1-2 lbs per plant",
      category: "Vegetables",
      stages: [
        { name: "Seed Planting", duration: "Day 1-5", description: "Plant seeds in cool, moist soil", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 5-10", description: "Seeds sprout quickly in cool conditions", icon: Leaf, progress: 20 },
        { name: "Leaf Development", duration: "Day 10-30", description: "Tender leaves form the characteristic rosette", icon: Sun, progress: 60 },
        { name: "Head Formation", duration: "Day 30-45", description: "Leaves tighten into a compact head", icon: Droplets, progress: 80 },
        { name: "Harvest", duration: "Day 45-65", description: "Crisp, fresh lettuce ready to harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "carrots",
      name: "Carrots",
      icon: "🥕",
      growthTime: "70-80 days",
      difficulty: "Intermediate",
      waterNeeds: "Medium",
      waterAmount: "1 inch per week",
      weatherType: "Cool & Dry",
      temperature: "55-75°F",
      humidity: "40-60%",
      yield: "0.5-1 lb per plant",
      category: "Vegetables",
      stages: [
        { name: "Seed Planting", duration: "Day 1-10", description: "Plant tiny seeds in loose, deep soil", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 10-21", description: "Delicate green tops emerge slowly", icon: Leaf, progress: 15 },
        { name: "Top Growth", duration: "Day 21-40", description: "Feathery green foliage develops", icon: Sun, progress: 40 },
        { name: "Root Development", duration: "Day 40-60", description: "Orange root begins forming underground", icon: Droplets, progress: 70 },
        { name: "Root Maturation", duration: "Day 60-70", description: "Carrot root reaches full size and sweetness", icon: Package, progress: 90 },
        { name: "Harvest", duration: "Day 70-80", description: "Sweet, crunchy carrots ready to pull", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "spinach",
      name: "Spinach",
      icon: "🥬",
      growthTime: "40-50 days",
      difficulty: "Beginner",
      waterNeeds: "Medium",
      waterAmount: "1-1.5 inches per week",
      weatherType: "Cool & Moist",
      temperature: "50-70°F",
      humidity: "65-75%",
      yield: "4-6 oz per plant",
      category: "Vegetables",
      stages: [
        { name: "Seed Planting", duration: "Day 1-7", description: "Plant seeds in rich, well-drained soil", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 7-14", description: "Small green leaves emerge", icon: Leaf, progress: 25 },
        { name: "Leaf Growth", duration: "Day 14-35", description: "Dark green, nutritious leaves develop", icon: Sun, progress: 70 },
        { name: "Maturation", duration: "Day 35-40", description: "Leaves reach full size and flavor", icon: Droplets, progress: 90 },
        { name: "Harvest", duration: "Day 40-50", description: "Fresh, tender spinach ready to pick", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "peppers",
      name: "Bell Peppers",
      icon: "🫑",
      growthTime: "80-100 days",
      difficulty: "Intermediate",
      waterNeeds: "Medium",
      waterAmount: "1-2 inches per week",
      weatherType: "Warm & Humid",
      temperature: "70-85°F",
      humidity: "60-80%",
      yield: "6-10 peppers per plant",
      category: "Vegetables",
      stages: [
        { name: "Seed Planting", duration: "Day 1-10", description: "Plant seeds in warm, fertile soil", icon: Sprout, progress: 0 },
        { name: "Germination", duration: "Day 10-21", description: "Seeds sprout in warm conditions", icon: Leaf, progress: 15 },
        { name: "Vegetative Growth", duration: "Day 21-50", description: "Strong stems and leaves develop", icon: Sun, progress: 45 },
        { name: "Flowering", duration: "Day 50-70", description: "Small white flowers appear", icon: Sun, progress: 65 },
        { name: "Fruit Formation", duration: "Day 70-90", description: "Small peppers begin to form and grow", icon: Droplets, progress: 85 },
        { name: "Harvest", duration: "Day 80-100", description: "Colorful, crisp peppers ready to harvest", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "cabbage",
      name: "Cabbage",
      icon: "🥬",
      growthTime: "80-120 days",
      difficulty: "Intermediate",
      waterNeeds: "High",
      waterAmount: "1.5-2 inches per week",
      weatherType: "Cool & Moist",
      temperature: "55-75°F",
      humidity: "65-80%",
      yield: "2-8 lbs per head",
      category: "Vegetables",
      stages: [
        { name: "Seed Starting", duration: "Day 1-14", description: "Start seeds indoors or in greenhouse", icon: Sprout, progress: 0 },
        { name: "Transplanting", duration: "Day 14-21", description: "Move seedlings to garden beds", icon: Leaf, progress: 18 },
        { name: "Leaf Development", duration: "Day 21-60", description: "Outer leaves form and expand", icon: Sun, progress: 50 },
        { name: "Head Formation", duration: "Day 60-100", description: "Inner leaves form tight head", icon: Droplets, progress: 83 },
        { name: "Harvest", duration: "Day 80-120", description: "Firm, dense heads ready to cut", icon: Scissors, progress: 100 }
      ]
    },
    {
      id: "onions",
      name: "Onions",
      icon: "🧅",
      growthTime: "90-120 days",
      difficulty: "Intermediate",
      waterNeeds: "Medium",
      waterAmount: "1 inch per week",
      weatherType: "Cool to Warm",
      temperature: "55-75°F",
      humidity: "50-70%",
      yield: "1-2 lbs per plant",
      category: "Vegetables",
      stages: [
        { name: "Planting", duration: "Day 1-10", description: "Plant sets or seeds in well-drained soil", icon: Sprout, progress: 0 },
        { name: "Root Development", duration: "Day 10-30", description: "Strong root system establishes", icon: Leaf, progress: 25 },
        { name: "Green Growth", duration: "Day 30-70", description: "Green tops grow tall and thick", icon: Sun, progress: 58 },
        { name: "Bulb Formation", duration: "Day 70-100", description: "Underground bulb begins to swell", icon: Droplets, progress: 83 },
        { name: "Harvest", duration: "Day 90-120", description: "Mature bulbs ready when tops fall over", icon: Scissors, progress: 100 }
      ]
    }
  ];

  const handleCropSelect = (cropId: string) => {
    setSelectedCrop(cropId);
    setShowResults(false);
    setAnimationStage(0);
    setCurrentStageIndex(0);
    // Start the animation sequence
    setTimeout(() => setShowResults(true), 500);
  };

  const selectedCropData = crops.find(c => c.id === selectedCrop);

  // Animation progression effect
  useEffect(() => {
    if (!showResults || !selectedCropData) return;

    const stages = selectedCropData.stages;
    let stageIndex = 0;
    let animStage = 0;

    const progressAnimation = () => {
      // Water pouring animation (stage 0)
      if (animStage === 0) {
        setAnimationStage(1);
        setTimeout(() => {
          setAnimationStage(2); // Seeds growing
          setTimeout(() => {
            setAnimationStage(3); // Start stage progression
            startStageProgression();
          }, 2000);
        }, 3000);
      }
    };

    const startStageProgression = () => {
      const interval = setInterval(() => {
        if (stageIndex < stages.length - 1) {
          stageIndex++;
          setCurrentStageIndex(stageIndex);
        } else {
          clearInterval(interval);
          setAnimationStage(4); // Final harvest animation
        }
      }, 1500);
    };

    progressAnimation();
  }, [showResults, selectedCropData]);


  const goalCategories = [
    {
      icon: Droplets,
      title: "Water Conservation",
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      goals: [
        "Reduce water usage by 25% through drip irrigation systems",
        "Install rainwater harvesting infrastructure",
        "Implement smart irrigation scheduling based on weather data",
        "Create water retention ponds for drought resilience",
        "Upgrade to moisture-sensing irrigation controls"
      ]
    },
    {
      icon: Leaf,
      title: "Soil Health",
      color: "text-green-600",
      bgColor: "bg-green-50",
      goals: [
        "Increase soil carbon sequestration by 15%",
        "Implement crop rotation for enhanced soil fertility",
        "Establish cover crop systems on 80% of farmland",
        "Reduce soil erosion by 40% through conservation tillage",
        "Achieve optimal soil pH levels across all fields"
      ]
    },
    {
      icon: Recycle,
      title: "Waste Reduction",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      goals: [
        "Minimize food waste to under 5%",
        "Create comprehensive composting system for organic waste",
        "Implement circular economy practices on farm",
        "Reduce packaging waste by 60%",
        "Establish farm-to-table direct sales to reduce transport waste"
      ]
    },
    {
      icon: Zap,
      title: "Energy Efficiency",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      goals: [
        "Achieve 90% renewable energy usage on farm",
        "Install solar panels to power farm operations",
        "Upgrade to energy-efficient equipment and machinery",
        "Implement energy monitoring systems",
        "Reduce overall energy consumption by 35%"
      ]
    },
    {
      icon: Target,
      title: "Pest Management",
      color: "text-red-600",
      bgColor: "bg-red-50",
      goals: [
        "Implement integrated pest management systems",
        "Reduce chemical pesticide use by 50%",
        "Establish beneficial insect habitat zones",
        "Use biological pest control methods",
        "Monitor pest populations with smart traps"
      ]
    },
    {
      icon: Globe,
      title: "Carbon Footprint",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      goals: [
        "Achieve carbon-neutral farming operations",
        "Reduce greenhouse gas emissions by 30%",
        "Plant trees for carbon offset programs",
        "Optimize transportation routes to reduce emissions",
        "Implement carbon tracking and reporting systems"
      ]
    }
  ];

  const achievements = [
    { label: "Water Saved", value: "2.5M", unit: "gallons", icon: Droplets },
    { label: "Carbon Reduced", value: "150", unit: "tons CO₂", icon: Leaf },
    { label: "Goals Completed", value: "42", unit: "this year", icon: CheckCircle },
    { label: "Efficiency Gained", value: "35%", unit: "improvement", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navigation />
      <BackButton />
      
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <Badge variant="secondary" className="px-3 py-1">
              <Target className="h-4 w-4 mr-2" />
              Smart Goals Dashboard
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-green-100 to-blue-100 mb-6">
            <Target className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Sustainable Farming
            <span className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text"> Goals</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your farming practices with our comprehensive collection of sustainable goals. 
            Track progress, earn achievements, and make a positive impact on the environment.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-6 text-center bg-white/50 backdrop-blur-sm border-none shadow-natural">
              <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {achievement.value}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                {achievement.unit}
              </div>
              <div className="text-xs font-medium text-primary">
                {achievement.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Crop Growth Journey */}
        <div className="space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Crop Growth Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Select a crop to visualize its complete growth process from seed to harvest
            </p>
          </div>

          {/* Enhanced Crop Selection Grid */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                {crops.length} Crops Available - Click to Select
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {crops.map((crop) => (
                <Card 
                  key={crop.id}
                  className={`group relative p-6 cursor-pointer transition-all duration-500 transform hover:shadow-2xl border-3 ${
                    selectedCrop === crop.id 
                      ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-2xl scale-105 ring-2 ring-primary/20' 
                      : 'border-border/50 bg-white/60 backdrop-blur-sm hover:border-primary/60 hover:scale-102 hover:bg-white/80'
                  }`}
                  onClick={() => handleCropSelect(crop.id)}
                >
                  {/* Category Badge */}
                  <div className="absolute -top-2 -right-2">
                    <Badge 
                      variant={selectedCrop === crop.id ? "default" : "outline"} 
                      className="text-xs"
                    >
                      {crop.category}
                    </Badge>
                  </div>

                  {/* Selection Indicator */}
                  {selectedCrop === crop.id && (
                    <div className="absolute top-2 left-2 animate-pulse">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  )}

                  <div className="text-center relative">
                    <div className={`text-5xl mb-4 transform transition-transform duration-300 ${
                      selectedCrop === crop.id ? 'scale-110 animate-pulse' : 'group-hover:scale-110'
                    }`}>
                      {crop.icon}
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-3 transition-colors ${
                      selectedCrop === crop.id ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {crop.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{crop.growthTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            crop.difficulty === 'Beginner' ? 'text-green-600 border-green-200' :
                            crop.difficulty === 'Intermediate' ? 'text-yellow-600 border-yellow-200' :
                            'text-red-600 border-red-200'
                          }`}
                        >
                          {crop.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Click to Select Indicator */}
                    <div className={`mt-4 text-xs transition-opacity ${
                      selectedCrop === crop.id ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'
                    }`}>
                      Click to view details
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        {/* Animated Crop Visualization */}
        {selectedCrop && showResults && selectedCropData && (
          <div className="mt-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-white to-muted/20 border-0 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">{selectedCropData.icon}</div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {selectedCropData.name} Growth Journey
                </h3>
                <div className="flex justify-center gap-2 mb-6">
                  <Badge variant="secondary" className="px-4 py-2">
                    {selectedCropData.category}
                  </Badge>
                  <Badge 
                    variant={selectedCropData.difficulty === 'Beginner' ? 'default' : 
                           selectedCropData.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    className="px-4 py-2"
                  >
                    {selectedCropData.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Animated Visualization Area */}
              <div className="relative bg-gradient-to-b from-sky-100 to-green-100 rounded-xl p-8 mb-8 min-h-[400px] overflow-hidden">
                {/* Sky Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-200 to-sky-100"></div>
                
                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-amber-800 to-amber-600"></div>

                {/* Animated Water Drops */}
                {(animationStage >= 1) && (
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-3 h-6 bg-blue-400 rounded-full animate-bounce opacity-70 ${
                          animationStage >= 1 ? 'animate-fade-in' : 'opacity-0'
                        }`}
                        style={{
                          left: `${i * 20 - 40}px`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                    <div className="text-center mt-8 text-blue-600 font-medium animate-pulse">
                      💧 Water Pouring ({selectedCropData.waterAmount})
                    </div>
                  </div>
                )}

                {/* Growing Plant Animation */}
                <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  {/* Seed/Root System */}
                  <div className={`transition-all duration-1000 ${
                    animationStage >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}>
                    <div className="w-8 h-8 bg-amber-600 rounded-full mb-2 animate-pulse"></div>
                    <div className="text-xs text-amber-700 text-center">🌱 Seeds Sprouting</div>
                  </div>

                  {/* Plant Growth Stages */}
                  <div className={`mt-4 transition-all duration-1000 ${
                    animationStage >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}>
                    <div className="flex flex-col items-center space-y-2">
                      {selectedCropData.stages.slice(0, currentStageIndex + 1).map((stage, index) => {
                        const StageIcon = stage.icon;
                        return (
                          <div
                            key={index}
                            className={`flex items-center space-x-2 p-2 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-500 ${
                              index === currentStageIndex ? 'scale-110 shadow-lg ring-2 ring-primary' : ''
                            }`}
                            style={{
                              animationDelay: `${index * 0.5}s`
                            }}
                          >
                            <StageIcon className={`w-4 h-4 ${
                              index === currentStageIndex ? 'text-primary animate-pulse' : 'text-muted-foreground'
                            }`} />
                            <span className="text-xs font-medium">{stage.name}</span>
                            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-1000 rounded-full"
                                style={{ width: `${stage.progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Final Harvest Animation */}
                  {animationStage >= 4 && (
                    <div className="absolute -top-16 animate-bounce">
                      <div className="text-4xl animate-pulse">{selectedCropData.icon}</div>
                      <div className="text-center mt-2">
                        <span className="text-green-600 font-bold">🎉 Ready to Harvest!</span>
                        <div className="text-sm text-green-700 mt-1">
                          Expected: {selectedCropData.yield}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weather Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs">{selectedCropData.weatherType}</span>
                </div>

                {/* Temperature Gauge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2">
                  <div className="w-2 h-8 bg-gradient-to-t from-blue-400 to-red-400 rounded-full"></div>
                  <span className="text-xs">{selectedCropData.temperature}</span>
                </div>
              </div>

              {/* Crop Requirements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-4 bg-sky-50/50 border-sky-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-5 w-5 text-sky-600" />
                    <span className="font-semibold text-sky-800">Water Needs</span>
                  </div>
                  <p className="text-sky-700 text-sm mb-1">{selectedCropData.waterNeeds}</p>
                  <p className="text-sky-600 text-xs">{selectedCropData.waterAmount}</p>
                </Card>

                <Card className="p-4 bg-amber-50/50 border-amber-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Sun className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">Weather</span>
                  </div>
                  <p className="text-amber-700 text-sm mb-1">{selectedCropData.weatherType}</p>
                  <p className="text-amber-600 text-xs">{selectedCropData.temperature}</p>
                </Card>

                <Card className="p-4 bg-green-50/50 border-green-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Growth Time</span>
                  </div>
                  <p className="text-green-700 text-sm">{selectedCropData.growthTime}</p>
                </Card>

                <Card className="p-4 bg-purple-50/50 border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Expected Yield</span>
                  </div>
                  <p className="text-purple-700 text-sm">{selectedCropData.yield}</p>
                </Card>
              </div>

              {/* Detailed Growth Timeline */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-center mb-6">Complete Growth Timeline</h4>
                {selectedCropData.stages.map((stage, index) => {
                  const StageIcon = stage.icon;
                  const isActive = animationStage >= 3 && index <= currentStageIndex;
                  const isCompleted = animationStage >= 4 || (animationStage >= 3 && index < currentStageIndex);
                  
                  return (
                    <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ${
                      isActive ? 'bg-primary/10 border-primary shadow-lg scale-105' : 
                      isCompleted ? 'bg-green-50 border-green-200' : 'bg-muted/30 border-border/50'
                    }`}>
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isCompleted ? 'bg-green-500 text-white' :
                          isActive ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-6 h-6" /> : <StageIcon className="w-6 h-6" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className={`font-semibold ${isActive ? 'text-primary' : ''}`}>{stage.name}</h5>
                          <span className="text-sm text-muted-foreground">{stage.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                        <Progress 
                          value={isCompleted ? 100 : isActive ? stage.progress : 0} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
        </div>

        {/* Goals Categories */}
        <div className="space-y-12 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Goal Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore sustainable farming goals organized by impact area
            </p>
          </div>

          <div className="grid gap-8">
            {goalCategories.map((category, index) => (
              <Card key={index} className="p-8 bg-white/50 backdrop-blur-sm border-none shadow-natural hover:shadow-elevated transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-xl ${category.bgColor} relative overflow-visible`}>
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                    {/* Water Harvesting Animation */}
                    {category.title === "Water Conservation" && (
                      <div className="absolute -top-12 -right-12 w-32 h-36 pointer-events-none z-10">
                        {/* Animated large water drops falling */}
                        <div className="absolute top-0 left-4 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.2s' }}></div>
                        <div className="absolute top-1 left-8 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.2s' }}></div>
                        <div className="absolute top-0 left-12 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '1.2s' }}></div>
                        <div className="absolute top-2 left-16 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}></div>
                        <div className="absolute top-1 left-20 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.2s' }}></div>
                        
                        {/* Roof structure */}
                        <div className="absolute top-8 left-2 w-16 h-3 bg-gray-600 transform -rotate-12 rounded-sm shadow-md border border-gray-700"></div>
                        <div className="absolute top-9 left-1 w-18 h-2 bg-gray-500 transform -rotate-12 rounded-sm"></div>
                        
                        {/* Large collection tank */}
                        <div className="absolute bottom-4 left-6 w-12 h-10 bg-sky-50 border-3 border-sky-500 rounded-b-xl shadow-lg">
                          {/* Animated water level with wave effect */}
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-sky-500 to-sky-400 rounded-b-xl animate-pulse" style={{ height: '70%' }}></div>
                          {/* Water surface with ripples */}
                          <div className="absolute top-3 left-1 w-10 h-px bg-sky-200 opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute top-3 left-2 w-8 h-px bg-sky-300 opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                          {/* Tank label */}
                          <div className="absolute -bottom-6 left-0 w-12 text-center">
                            <span className="text-xs font-medium text-sky-600 bg-white/80 px-2 py-1 rounded-full shadow-sm">Tank</span>
                          </div>
                        </div>
                        
                        {/* Enhanced splash effects */}
                        <div className="absolute bottom-12 left-8 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.2s' }}></div>
                        <div className="absolute bottom-12 left-12 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.6s' }}></div>
                        <div className="absolute bottom-13 left-10 w-1 h-1 bg-sky-300 rounded-full animate-ping opacity-80" style={{ animationDelay: '2s' }}></div>
                        
                        {/* Flow indicators */}
                        <div className="absolute top-11 left-8 w-px h-6 bg-gradient-to-b from-sky-400 to-transparent animate-pulse"></div>
                        <div className="absolute top-11 left-12 w-px h-8 bg-gradient-to-b from-sky-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {category.title}
                    </h3>
                    <div className="grid gap-3">
                      {category.goals.map((goal, goalIndex) => (
                        <div key={goalIndex} className="flex items-start space-x-3 group">
                          <div className="flex-shrink-0 mt-2">
                            <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          {goal === "Reduce water usage by 25% through drip irrigation systems" ? (
                            <Link 
                              to="/drip-irrigation-game"
                              className="text-muted-foreground leading-relaxed group-hover:text-primary transition-colors cursor-pointer hover:underline"
                            >
                              {goal}
                            </Link>
                          ) : (
                            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                              {goal}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="group">
                        Start Tracking Goals
                        <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-12 bg-gradient-to-r from-green-50 to-blue-50 border-none shadow-elevated">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Sustainable Journey?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of farmers who are already making a difference. 
                Set your goals, track progress, and earn rewards for sustainable practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Get Started Today
                  <Target className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">
                    Learn More About KrishiKhel
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SustainableGoals;
