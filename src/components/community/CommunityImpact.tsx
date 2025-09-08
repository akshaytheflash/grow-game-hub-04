import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, TreePine, Leaf, Award, TrendingUp } from "lucide-react";
import { useBadges } from "@/hooks/useBadges";

const CommunityImpact = () => {
  const { getUserBadges, getBadgeProgress } = useBadges();
  const [badges, setBadges] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userBadges, badgeProgress] = await Promise.all([
        getUserBadges(),
        getBadgeProgress()
      ]);
      setBadges(userBadges);
      setProgress(badgeProgress);
    } catch (error) {
      console.error('Error loading badge data:', error);
    }
  };

  // Mock community impact data
  const impactStats = [
    { label: "Water Saved", value: "47,230L", icon: Droplets, color: "text-blue-600" },
    { label: "Trees Planted", value: "1,247", icon: TreePine, color: "text-green-600" },
    { label: "Eco Actions", value: "892", icon: Leaf, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-4">
      {/* Community Impact */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Community Impact</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {impactStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
          ))}
          
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              This month • +12% from last month
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Your Badges */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Your Badges</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {badges.length > 0 ? (
            <div className="space-y-2">
              {badges.slice(0, 3).map((badge, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-lg">{badge.badge_icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{badge.badge_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Earned {new Date(badge.earned_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {badges.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{badges.length - 3} more badges
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Complete actions to earn badges!
              </p>
              {progress.slice(0, 2).map((p, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{p.badge_name}</span>
                    <span>{p.current_count}/{p.required_count}</span>
                  </div>
                  <Progress value={p.progress_percentage} className="h-1" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Trending Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {['#drip-irrigation', '#organic', '#soil-health', '#water-saving', '#pest-control'].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityImpact;