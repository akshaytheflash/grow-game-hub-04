import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Quest {
  id: string;
  title: string;
  points: number;
  quest_type: 'daily' | 'weekly' | 'special';
  emoji: string | null;
  icon: string | null;
  description: string | null;
  is_active: boolean;
}

interface QuestProgress {
  id: string;
  quest_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completed_at: string | null;
}

interface QuestWithProgress extends Quest {
  completed: boolean;
  progress_id?: string;
}

export const useQuests = () => {
  const { user } = useAuth();
  const [quests, setQuests] = useState<QuestWithProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchQuests();
    } else {
      setQuests([]);
      setLoading(false);
    }
  }, [user]);

  const fetchQuests = async () => {
    if (!user) return;

    try {
      // Fetch all active quests
      const { data: questsData, error: questsError } = await supabase
        .from('quests')
        .select('*')
        .eq('is_active', true)
        .order('quest_type', { ascending: true })
        .order('order_index', { ascending: true });

      if (questsError) {
        console.error('Error fetching quests:', questsError);
        return;
      }

      // Fetch user's quest progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_quest_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching quest progress:', progressError);
        return;
      }

      // Merge quests with progress data
      const questsWithProgress: QuestWithProgress[] = (questsData || []).map(quest => {
        const progress = progressData?.find(p => p.quest_id === quest.id);
        return {
          ...quest,
          completed: progress?.status === 'completed',
          progress_id: progress?.id
        };
      });

      setQuests(questsWithProgress);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeQuest = async (questId: string) => {
    console.log('completeQuest called with questId:', questId);
    console.log('Current user:', user);
    
    if (!user) {
      console.log('No user found, cannot complete quest');
      toast.error('Please log in to complete quests');
      return;
    }

    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) {
      console.log('Quest not found or already completed:', quest);
      return;
    }

    console.log('Attempting to complete quest:', quest.title);

    try {
      console.log('Updating quest progress in database...');
      // Check if progress record exists
      const existingProgress = quests.find(q => q.id === questId)?.progress_id;
      
      if (existingProgress) {
        // Update existing progress record
        const { error: progressError } = await supabase
          .from('user_quest_progress')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', existingProgress);
          
        if (progressError) {
          console.error('Error updating quest progress:', progressError);
          toast.error('Failed to complete quest');
          return;
        }
      } else {
        // Create new progress record
        const { error: progressError } = await supabase
          .from('user_quest_progress')
          .insert({
            user_id: user.id,
            quest_id: questId,
            status: 'completed',
            completed_at: new Date().toISOString(),
            date_assigned: new Date().toISOString().split('T')[0],
            week_start: quest.quest_type === 'weekly' ? 
              new Date(Date.now() - (new Date().getDay() - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
              null
          });
          
        if (progressError) {
          console.error('Error creating quest progress:', progressError);
          toast.error('Failed to complete quest');
          return;
        }
      }

      console.log('Quest progress updated successfully');

      console.log('Fetching current profile to update credits...');
      // Award credits (+5 for sustainable practices)
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('credits')
        .eq('user_id', user.id)
        .single();

      if (!fetchError && currentProfile) {
        console.log('Current credits:', currentProfile.credits);
        const newCredits = currentProfile.credits + 5;
        console.log('Updating to new credits:', newCredits);
        
        const { error: creditError } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('user_id', user.id);

        if (creditError) {
          console.error('Error awarding credits:', creditError);
          // Still show success for quest completion even if credits fail
        } else {
          console.log('Credits updated successfully');
        }
      } else {
        console.error('Error fetching profile:', fetchError);
      }

      // Update local state
      setQuests(prev => prev.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));

      toast.success(`🎉 Quest completed! +5 credits earned!`);
      
      // Refresh quest data to get latest state
      setTimeout(() => fetchQuests(), 1000);

    } catch (error) {
      console.error('Error completing quest:', error);
      toast.error('Failed to complete quest');
    }
  };

  const getDailyQuests = () => quests.filter(q => q.quest_type === 'daily');
  const getWeeklyQuests = () => quests.filter(q => q.quest_type === 'weekly');

  return {
    quests,
    loading,
    completeQuest,
    getDailyQuests,
    getWeeklyQuests,
    refetch: fetchQuests
  };
};