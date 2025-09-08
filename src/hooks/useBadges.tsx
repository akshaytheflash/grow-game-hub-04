import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface UserBadge {
  id: string;
  badge_name: string;
  badge_icon: string;
  badge_color: string;
  earned_at: string;
  criteria_met: string;
}

export interface BadgeProgress {
  badge_name: string;
  current_count: number;
  required_count: number;
  progress_percentage: number;
}

export const useBadges = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getUserBadges = async (): Promise<UserBadge[]> => {
    // Mock implementation for now
    return [];
  };

  const getBadgeProgress = async (): Promise<BadgeProgress[]> => {
    // Mock badge progress
    const badgeRequirements = [
      { name: 'Soil Guardian', current: 2, required: 5 },
      { name: 'Water Saver', current: 7, required: 10 },
      { name: 'Pollinator Protector', current: 1, required: 3 },
      { name: 'Eco Mentor', current: 5, required: 10 },
      { name: 'Renewable Champion', current: 3, required: 5 },
      { name: 'Storyteller', current: 2, required: 3 },
    ];

    return badgeRequirements.map(req => ({
      badge_name: req.name,
      current_count: req.current,
      required_count: req.required,
      progress_percentage: Math.min(100, (req.current / req.required) * 100)
    }));
  };

  const checkAndAwardBadges = async () => {
    if (!user) return;

    // This would typically be called by a database function or trigger
    // For now, we'll implement basic client-side checking
    const progress = await getBadgeProgress();
    const earnedBadges = progress.filter(p => p.progress_percentage >= 100);

    for (const badge of earnedBadges) {
      // Check if user already has this badge
      const { data: existing } = await (supabase as any)
        .from('user_badges')
        .select('id')
        .eq('user_id', user.id)
        .eq('badge_name', badge.badge_name)
        .single();

      if (!existing) {
        await (supabase as any)
          .from('user_badges')
          .insert({
            user_id: user.id,
            badge_name: badge.badge_name,
            badge_icon: getBadgeIcon(badge.badge_name),
            badge_color: getBadgeColor(badge.badge_name),
            criteria_met: `Completed ${badge.required_count} actions`
          });
      }
    }
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

  const getBadgeColor = (badgeName: string): string => {
    const colors: Record<string, string> = {
      'Soil Guardian': '#8B4513',
      'Water Saver': '#1E90FF',
      'Pollinator Protector': '#FFD700',
      'Eco Mentor': '#32CD32',
      'Renewable Champion': '#FF6347',
      'Storyteller': '#9370DB',
    };
    return colors[badgeName] || '#6B7280';
  };

  return {
    loading,
    setLoading,
    getUserBadges,
    getBadgeProgress,
    checkAndAwardBadges,
  };
};