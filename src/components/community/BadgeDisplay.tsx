import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star } from 'lucide-react';
import { useBadges, type UserBadge, type BadgeProgress } from '@/hooks/useBadges';
import { useAuth } from '@/hooks/useAuth';

const BadgeDisplay = () => {
  const { user } = useAuth();
  const { getUserBadges, getBadgeProgress, loading } = useBadges();
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress[]>([]);

  useEffect(() => {
    if (user) {
      loadBadgeData();
    }
  }, [user]);

  const loadBadgeData = async () => {
    try {
      const [badges, progress] = await Promise.all([
        getUserBadges(),
        getBadgeProgress()
      ]);
      
      setUserBadges(badges);
      setBadgeProgress(progress);
    } catch (error) {
      console.error('Error loading badge data:', error);
    }
  };

  const earnedBadges = badgeProgress.filter(b => b.progress_percentage >= 100);
  const inProgressBadges = badgeProgress.filter(b => b.progress_percentage < 100);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Trophy className="h-5 w-5 mr-2" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="w-24 h-3 bg-muted rounded mb-1" />
                  <div className="w-16 h-2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Trophy className="h-5 w-5 mr-2" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Earned ({earnedBadges.length})
            </h4>
            <div className="space-y-2">
              {earnedBadges.map((badge) => (
                <div key={badge.badge_name} className="flex items-center space-x-3 p-2 bg-secondary/50 rounded-lg">
                  <div className="text-2xl">{getBadgeIcon(badge.badge_name)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{badge.badge_name}</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Complete
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {badge.current_count}/{badge.required_count} actions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Badges */}
        {inProgressBadges.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              In Progress
            </h4>
            <div className="space-y-3">
              {inProgressBadges.map((badge) => (
                <div key={badge.badge_name} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl opacity-60">{getBadgeIcon(badge.badge_name)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{badge.badge_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {badge.current_count}/{badge.required_count}
                        </span>
                      </div>
                      <Progress 
                        value={badge.progress_percentage} 
                        className="h-2 mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {earnedBadges.length === 0 && inProgressBadges.length === 0 && (
          <div className="text-center py-6">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Start participating in the community to earn badges!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const getBadgeIcon = (badgeName: string): string => {
  const icons: Record<string, string> = {
    'Soil Guardian': '🌱',
    'Water Saver': '💧',
    'Pollinator Protector': '🐝',
    'Eco Mentor': '🌍',
    'Renewable Champion': '🔋',
    'Storyteller': '📸',
  };
  return icons[badgeName] || '🏆';
};

export default BadgeDisplay;