import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  credits: number;
  points: number;
  level: number;
  display_name: string | null;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits, points, level, display_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data || { credits: 0, points: 0, level: 1, display_name: null });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = async (newCredits: number) => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ credits: newCredits })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating credits:', error);
        return;
      }

      setProfile(prev => prev ? { ...prev, credits: newCredits } : prev);
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  return {
    profile,
    loading,
    updateCredits,
    refetch: fetchProfile
  };
};