import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Leaf, 
  Plus, 
  MessageCircle,
  Calendar,
  TrendingUp,
  Globe
} from "lucide-react";

interface Pod {
  id: string;
  name: string;
  location: string;
  cropFocus: string;
  members: number;
  isPrivate: boolean;
  recentActivity: string;
  onlineMembers: number;
  description: string;
  avatar: string;
}

const LocalPods = () => {
  const nearbyPods: Pod[] = [
    {
      id: "1",
      name: "Organic Wheat Growers",
      location: "Punjab",
      cropFocus: "Wheat",
      members: 47,
      isPrivate: false,
      recentActivity: "2 hours ago",
      onlineMembers: 8,
      description: "Sustainable wheat farming practices and organic certification support",
      avatar: "OWG"
    },
    {
      id: "2", 
      name: "Rice Innovation Hub",
      location: "West Bengal",
      cropFocus: "Rice",
      members: 32,
      isPrivate: false,
      recentActivity: "5 hours ago",
      onlineMembers: 5,
      description: "Modern rice cultivation techniques and SRI methods",
      avatar: "RIH"
    },
    {
      id: "3",
      name: "Millet Collective",
      location: "Karnataka",
      cropFocus: "Millet",
      members: 28,
      isPrivate: true,
      recentActivity: "1 day ago",
      onlineMembers: 3,
      description: "Traditional millet farming revival and market connections",
      avatar: "MC"
    }
  ];

  const suggestedPods: Pod[] = [
    {
      id: "4",
      name: "Drip Tech Warriors",
      location: "Maharashtra",
      cropFocus: "Mixed Crops",
      members: 15,
      isPrivate: false,
      recentActivity: "3 hours ago",
      onlineMembers: 4,
      description: "Advanced irrigation technology adoption and support",
      avatar: "DTW"
    },
    {
      id: "5",
      name: "Climate Resilient Farming",
      location: "Rajasthan",
      cropFocus: "Drought-resistant",
      members: 23,
      isPrivate: false,
      recentActivity: "6 hours ago",
      onlineMembers: 2,
      description: "Climate adaptation strategies and drought management",
      avatar: "CRF"
    }
  ];

  const getCropIcon = (crop: string) => {
    return <Leaf className="w-3 h-3 text-green-600" />;
  };

  return (
    <div className="space-y-4">
      {/* My Pods */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <span>My Pods</span>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nearbyPods.map((pod) => (
            <div key={pod.id} className="group border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                    {pod.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-xs truncate">{pod.name}</h4>
                    {pod.isPrivate && <Globe className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{pod.location}</span>
                    <span>•</span>
                    {getCropIcon(pod.cropFocus)}
                    <span>{pod.cropFocus}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{pod.members}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{pod.onlineMembers}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {pod.recentActivity}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Pods */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Suggested Pods</CardTitle>
          <p className="text-xs text-muted-foreground">Based on your interests and location</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestedPods.map((pod) => (
            <div key={pod.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs font-medium bg-secondary/50">
                    {pod.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs mb-1">{pod.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {pod.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{pod.members}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{pod.location}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-6">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pod Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Pod Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MessageCircle className="w-3 h-3" />
              <span>Messages today</span>
            </div>
            <span className="font-medium">47</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>New posts</span>
            </div>
            <span className="font-medium">12</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>Upcoming events</span>
            </div>
            <span className="font-medium">3</span>
          </div>
        </CardContent>
      </Card>

      {/* Create Pod */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Plus className="w-8 h-8 mx-auto text-muted-foreground" />
            <h4 className="font-medium text-sm">Create Your Pod</h4>
            <p className="text-xs text-muted-foreground">
              Start a community around your farming interests
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Create Pod
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalPods;