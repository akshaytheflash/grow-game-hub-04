import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Droplets, 
  Leaf, 
  Sun, 
  Zap,
  Award,
  Calendar,
  MapPin,
  Upload
} from "lucide-react";

interface ShowcasePost {
  id: string;
  farmer: {
    name: string;
    avatar: string;
    location: string;
    verified: boolean;
  };
  crop: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  technique: string;
  results: {
    waterSaved?: number;
    yieldIncrease?: number;
    costReduction?: number;
    timeframe: string;
  };
  upvotes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

const CropShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("trending");

  const showcasePosts: ShowcasePost[] = [
    {
      id: "1",
      farmer: {
        name: "Priya Sharma",
        avatar: "PS",
        location: "Punjab, India",
        verified: true
      },
      crop: "Wheat",
      title: "Drip Irrigation Transformation",
      description: "Converted from flood irrigation to drip system. The results speak for themselves!",
      beforeImage: "before-wheat",
      afterImage: "after-wheat",
      technique: "Drip Irrigation",
      results: {
        waterSaved: 40,
        yieldIncrease: 25,
        costReduction: 30,
        timeframe: "3 months"
      },
      upvotes: 47,
      comments: 12,
      timestamp: "2 days ago",
      tags: ["drip-irrigation", "water-conservation", "wheat"]
    },
    {
      id: "2",
      farmer: {
        name: "Ravi Kumar",
        avatar: "RK",
        location: "Karnataka, India",
        verified: false
      },
      crop: "Tomato",
      title: "Organic Pest Management Success",
      description: "Using companion planting and natural predators to control pests organically.",
      beforeImage: "before-tomato",
      afterImage: "after-tomato",
      technique: "Companion Planting",
      results: {
        yieldIncrease: 35,
        costReduction: 50,
        timeframe: "2 months"
      },
      upvotes: 32,
      comments: 8,
      timestamp: "4 days ago",
      tags: ["organic", "pest-control", "companion-planting"]
    },
    {
      id: "3",
      farmer: {
        name: "Anita Singh",
        avatar: "AS",
        location: "Uttar Pradesh, India",
        verified: true
      },
      crop: "Rice",
      title: "SRI Method Implementation",
      description: "System of Rice Intensification with minimal water and higher yields.",
      beforeImage: "before-rice",
      afterImage: "after-rice",
      technique: "SRI Method",
      results: {
        waterSaved: 60,
        yieldIncrease: 45,
        timeframe: "4 months"
      },
      upvotes: 65,
      comments: 19,
      timestamp: "1 week ago",
      tags: ["sri-method", "rice", "water-efficient"]
    }
  ];

  const categories = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recent", icon: Calendar },
    { id: "water", label: "Water Tech", icon: Droplets },
    { id: "organic", label: "Organic", icon: Leaf },
    { id: "yield", label: "High Yield", icon: Award }
  ];

  const getTechniqueIcon = (technique: string) => {
    switch (technique.toLowerCase()) {
      case 'drip irrigation': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'companion planting': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'sri method': return <Sun className="w-4 h-4 text-yellow-500" />;
      default: return <Zap className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Crop Showcase</h2>
          <p className="text-sm text-muted-foreground">Before & after transformations from fellow farmers</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Share Your Success
        </Button>
      </div>

      {/* Categories - Improved Layout */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 h-auto p-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex flex-col sm:flex-row items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate text-center">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {showcasePosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{post.farmer.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{post.farmer.name}</h4>
                          {post.farmer.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{post.farmer.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTechniqueIcon(post.technique)}
                      {post.technique}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
                    <Badge variant="outline" className="mt-2">
                      <Leaf className="w-3 h-3 mr-1" />
                      {post.crop}
                    </Badge>
                  </div>

                  {/* Before & After Images */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center border border-red-100">
                        <div className="text-center text-red-700">
                          <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                          <p className="text-xs font-medium">Before</p>
                          <p className="text-xs opacity-75">Traditional Method</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center border border-green-100">
                        <div className="text-center text-green-700">
                          <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
                          <p className="text-xs font-medium">After</p>
                          <p className="text-xs opacity-75">{post.technique}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-accent/50 rounded-lg p-3 space-y-2">
                    <h5 className="font-medium text-xs text-center mb-2">Results in {post.results.timeframe}</h5>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                      {post.results.waterSaved && (
                        <div className="text-center">
                          <Droplets className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                          <p className="font-semibold">{post.results.waterSaved}%</p>
                          <p className="text-muted-foreground">Water Saved</p>
                        </div>
                      )}
                      {post.results.yieldIncrease && (
                        <div className="text-center">
                          <TrendingUp className="w-4 h-4 mx-auto text-green-500 mb-1" />
                          <p className="font-semibold">+{post.results.yieldIncrease}%</p>
                          <p className="text-muted-foreground">Yield</p>
                        </div>
                      )}
                      {post.results.costReduction && (
                        <div className="text-center">
                          <Award className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                          <p className="font-semibold">-{post.results.costReduction}%</p>
                          <p className="text-muted-foreground">Cost</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Load More Showcases</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropShowcase;