import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  start_date: string;
  end_date: string;
  target_value: number;
  unit: string;
  total_progress: number;
  participant_count: number;
  is_active: boolean;
  created_at: string;
  is_participating?: boolean;
  user_progress?: number;
}

export interface ChallengeParticipant {
  id: string;
  challenge_id: string;
  user_id: string;
  current_progress: number;
  joined_at: string;
}

export const useChallenges = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getChallenges = async (): Promise<Challenge[]> => {
    const { data, error } = await supabase
      .from('community_challenges')
      .select('*')
      .eq('is_active', true)
      .order('start_date', { ascending: false });

    if (error) throw error;

    // Check participation for each challenge if user is logged in
    if (user && data) {
      const challengeIds = data.map(challenge => challenge.id);
      const { data: participations } = await supabase
        .from('challenge_participants')
        .select('challenge_id, current_progress')
        .eq('user_id', user.id)
        .in('challenge_id', challengeIds);

      const participationMap = new Map();
      participations?.forEach(p => {
        participationMap.set(p.challenge_id, p.current_progress);
      });

      return data.map(challenge => ({
        ...challenge,
        is_participating: participationMap.has(challenge.id),
        user_progress: participationMap.get(challenge.id) || 0
      }));
    }

    return data || [];
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('challenge_participants')
      .insert({
        challenge_id: challengeId,
        user_id: user.id,
        current_progress: 0,
      });

    if (error) throw error;

    // Update participant count
    await (supabase as any).rpc('increment_challenge_participants', { challenge_id: challengeId });

    toast.success('Joined challenge successfully!');
  };

  const updateProgress = async (challengeId: string, progress: number) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('challenge_participants')
      .update({ current_progress: progress })
      .eq('challenge_id', challengeId)
      .eq('user_id', user.id);

    if (error) throw error;

    // Recalculate total progress
    await (supabase as any).rpc('recalculate_challenge_progress', { challenge_id: challengeId });

    toast.success('Progress updated!');
  };

  const createChallenge = async (challengeData: {
    title: string;
    description: string;
    challenge_type: string;
    start_date: string;
    end_date: string;
    target_value: number;
    unit: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('community_challenges')
      .insert({
        ...challengeData,
        is_active: true,
        total_progress: 0,
        participant_count: 0,
      })
      .select()
      .single();

    if (error) throw error;
    toast.success('Challenge created successfully!');
    return data;
  };

  const seedInitialChallenges = async () => {
    // Check if challenges already exist
    const { data: existingChallenges } = await supabase
      .from('community_challenges')
      .select('id')
      .limit(1);

    if (existingChallenges && existingChallenges.length > 0) return;

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const initialChallenges = [
      {
        title: 'Save 10,000L Water This Month',
        description: 'Community-wide water conservation challenge using drip irrigation and rainwater harvesting',
        challenge_type: 'water_saving',
        start_date: now.toISOString(),
        end_date: endDate.toISOString(),
        target_value: 10000,
        unit: 'liters',
        total_progress: 2340,
        participant_count: 23,
        is_active: true,
      },
      {
        title: 'Plant 1000 Trees Together',
        description: 'Reforestation challenge to improve soil health and biodiversity',
        challenge_type: 'tree_planting',
        start_date: now.toISOString(),
        end_date: endDate.toISOString(),
        target_value: 1000,
        unit: 'trees',
        total_progress: 156,
        participant_count: 34,
        is_active: true,
      }
    ];

    const { error } = await supabase
      .from('community_challenges')
      .insert(initialChallenges);

    if (error) console.error('Error seeding challenges:', error);
  };

  return {
    loading,
    setLoading,
    getChallenges,
    joinChallenge,
    updateProgress,
    createChallenge,
    seedInitialChallenges,
  };
};