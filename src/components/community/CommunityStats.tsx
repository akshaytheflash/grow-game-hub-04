import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Droplets,
  Leaf,
  Calendar,
  Target,
  Globe,
  Zap
} from "lucide-react";

const CommunityStats = () => {
  const communityMetrics = {
    totalMembers: 2847,
    onlineNow: 156,
    dailyPosts: 89,
    weeklyGrowth: 12.5,
    totalWaterSaved: 45600, // in liters
    totalCarbonOffset: 128, // in tonnes
    challengesCompleted: 34,
    knowledgeShared: 256
  };

  const topContributors = [
    { name: "Dr. Priya Sharma", points: 2456, avatar: "PS", badge: "Expert" },
    { name: "Ravi Kumar", points: 1892, avatar: "RK", badge: "Helper" },
    { name: "Singh Farm", points: 1674, avatar: "SF", badge: "Mentor" },
    { name: "Anita Mehta", points: 1523, avatar: "AM", badge: "Pioneer" }
  ];

  const activeGoals = [
    {
      title: "Community Water Savings",
      current: 45600,
      target: 50000,
      unit: "L",
      icon: Droplets,
      color: "blue"
    },
    {
      title: "Carbon Sequestration",
      current: 128,
      target: 150,
      unit: "tonnes",
      icon: Leaf,
      color: "green"
    },
    {
      title: "Knowledge Posts",
      current: 256,
      target: 300,
      unit: "posts",
      icon: MessageSquare,
      color: "purple"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Community Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Community Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-accent/50">
              <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <p className="text-lg font-bold">{communityMetrics.totalMembers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-accent/50">
              <Globe className="w-4 h-4 mx-auto mb-1 text-green-600" />
              <p className="text-lg font-bold">{communityMetrics.onlineNow}</p>
              <p className="text-xs text-muted-foreground">Online Now</p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageSquare className="w-3 h-3" />
                <span>Posts today</span>
              </div>
              <span className="font-medium">{communityMetrics.dailyPosts}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>Weekly growth</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                +{communityMetrics.weeklyGrowth}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Community Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 rounded-lg bg-blue-50">
              <Droplets className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <p className="font-bold text-blue-700">{communityMetrics.totalWaterSaved.toLocaleString()}L</p>
              <p className="text-blue-600">Water Saved</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-50">
              <Leaf className="w-4 h-4 mx-auto mb-1 text-green-600" />
              <p className="font-bold text-green-700">{communityMetrics.totalCarbonOffset}T</p>
              <p className="text-green-600">Carbon Offset</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-purple-50">
              <Award className="w-4 h-4 mx-auto mb-1 text-purple-600" />
              <p className="font-bold text-purple-700">{communityMetrics.challengesCompleted}</p>
              <p className="text-purple-600">Challenges</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-amber-50">
              <Zap className="w-4 h-4 mx-auto mb-1 text-amber-600" />
              <p className="font-bold text-amber-700">{communityMetrics.knowledgeShared}</p>
              <p className="text-amber-600">Tips Shared</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Goals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Community Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeGoals.map((goal, index) => {
            const Icon = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-3 h-3 text-${goal.color}-600`} />
                    <span className="font-medium">{goal.title}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {goal.current.toLocaleString()}/{goal.target.toLocaleString()} {goal.unit}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  {progress.toFixed(1)}% Complete
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Top Contributors</CardTitle>
          <p className="text-xs text-muted-foreground">This month's most helpful farmers</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {contributor.avatar}
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                    <Award className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{contributor.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {contributor.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{contributor.points} pts</span>
                </div>
              </div>
              <div className="text-xl">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span>Expert Q&A Session</span>
              <Badge variant="secondary">Tomorrow</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Community Challenge</span>
              <Badge variant="secondary">3 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Pod Meetup</span>
              <Badge variant="secondary">1 week</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityStats;