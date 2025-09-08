import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  MessageCircle, 
  MapPin, 
  Clock,
  Star,
  Package,
  Wrench,
  Leaf,
  Truck,
  BookOpen,
  Filter
} from "lucide-react";

interface TradeListing {
  id: string;
  user: {
    name: string;
    avatar: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  title: string;
  description: string;
  category: 'seeds' | 'tools' | 'equipment' | 'produce' | 'knowledge';
  condition: 'excellent' | 'good' | 'fair';
  wantsInReturn: string;
  timestamp: string;
  images: string[];
  interested: number;
}

const TradeBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tradeListings: TradeListing[] = [
    {
      id: "1",
      user: {
        name: "Priya Sharma",
        avatar: "PS",
        location: "Punjab, India",
        rating: 4.8,
        verified: true
      },
      title: "Heritage Wheat Seeds - Local Variety",
      description: "100kg of traditional Punjab wheat seeds. Drought resistant variety passed down through generations. Organic certified.",
      category: "seeds",
      condition: "excellent",
      wantsInReturn: "Vegetable seeds or drip irrigation components",
      timestamp: "2 hours ago",
      images: ["wheat-seeds"],
      interested: 7
    },
    {
      id: "2",
      user: {
        name: "Ravi Kumar",
        avatar: "RK",
        location: "Karnataka, India",
        rating: 4.6,
        verified: false
      },
      title: "Tractor Rotavator Attachment",
      description: "Heavy-duty rotavator in excellent condition. Used for 2 seasons only. Suitable for 35-45 HP tractors.",
      category: "equipment",
      condition: "excellent",
      wantsInReturn: "Seed drill or cash equivalent",
      timestamp: "5 hours ago",
      images: ["rotavator"],
      interested: 12
    },
    {
      id: "3",
      user: {
        name: "Dr. Anjali Mehta",
        avatar: "AM",
        location: "Expert - IARI",
        rating: 5.0,
        verified: true
      },
      title: "Soil Testing Kit + Training",
      description: "Professional soil testing kit with pH meter, EC meter, and NPK test strips. Includes 1-hour training session.",
      category: "tools",
      condition: "good",
      wantsInReturn: "Farm visit and case study participation",
      timestamp: "1 day ago",
      images: ["soil-kit"],
      interested: 23
    },
    {
      id: "4",
      user: {
        name: "Singh Brothers Farm",
        avatar: "SB",
        location: "Haryana, India",
        rating: 4.7,
        verified: true
      },
      title: "Organic Tomatoes - 200kg",
      description: "Fresh organic tomatoes, just harvested. Perfect for processing or direct sale. Pesticide-free certification available.",
      category: "produce",
      condition: "excellent",
      wantsInReturn: "Onion seeds or organic fertilizer",
      timestamp: "6 hours ago",
      images: ["tomatoes"],
      interested: 5
    }
  ];

  const categories = [
    { id: "all", label: "All Items", icon: Package, count: 47 },
    { id: "seeds", label: "Seeds", icon: Leaf, count: 12 },
    { id: "tools", label: "Tools", icon: Wrench, count: 8 },
    { id: "equipment", label: "Equipment", icon: Truck, count: 15 },
    { id: "produce", label: "Produce", icon: Package, count: 7 },
    { id: "knowledge", label: "Knowledge", icon: BookOpen, count: 5 }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seeds': return <Leaf className="w-4 h-4 text-green-600" />;
      case 'tools': return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'equipment': return <Truck className="w-4 h-4 text-purple-600" />;
      case 'produce': return <Package className="w-4 h-4 text-orange-600" />;
      case 'knowledge': return <BookOpen className="w-4 h-4 text-indigo-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const filteredListings = tradeListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Trade Board</h2>
          <p className="text-sm text-muted-foreground">Exchange seeds, tools, knowledge, and produce with fellow farmers</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search items to trade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories - Fixed Layout */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto p-1">
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
                <Badge variant="secondary" className="text-xs px-1 py-0 h-auto min-h-[16px] hidden md:inline-flex">
                  {category.count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{listing.user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{listing.user.name}</h4>
                          {listing.user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{listing.user.location}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{listing.user.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getCategoryIcon(listing.category)}
                      {listing.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {listing.description}
                    </p>
                  </div>

                  {/* Item Image Placeholder */}
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center border">
                    <div className="text-center text-muted-foreground">
                      <Package className="w-8 h-8 mx-auto mb-2 opacity-60" />
                      <p className="text-xs">Item Photo</p>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className={`font-medium capitalize ${getConditionColor(listing.condition)}`}>
                          {listing.condition}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{listing.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Wants in Return */}
                  <div className="bg-accent/50 rounded-lg p-3">
                    <h5 className="font-medium text-xs mb-1">Wants in return:</h5>
                    <p className="text-xs text-muted-foreground">{listing.wantsInReturn}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {listing.interested} interested
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm">
                        Make Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-medium mb-2">No items found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or browse different categories
              </p>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                List Your Item
              </Button>
            </div>
          )}

          {filteredListings.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">Load More Listings</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeBoard;