import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type CropFocus = Database['public']['Tables']['community_pods']['Insert']['crop_focus'];
type PodInsert = Database['public']['Tables']['community_pods']['Insert'];

export interface Pod {
  id: string;
  name: string;
  description: string | null;
  location: string;
  crop_focus: string | null;
  member_count: number;
  is_private: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_member?: boolean;
}

export interface PodMembership {
  id: string;
  pod_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export const usePods = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getPods = async (location?: string, cropType?: CropFocus): Promise<Pod[]> => {
    let query = supabase
      .from('community_pods')
      .select('*')
      .order('member_count', { ascending: false });

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (cropType) {
      query = query.eq('crop_focus', cropType);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Mock membership check for now
    if (user && data) {
      const memberPodIds: string[] = []; // Mock empty for now
      
      return data.map(pod => ({
        ...pod,
        is_member: memberPodIds.includes(pod.id)
      }));
    }

    return data || [];
  };

  const createPod = async (podData: {
    name: string;
    description: string;
    location: string;
    crop_focus?: CropFocus;
    is_private?: boolean;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('community_pods')
      .insert({
        ...podData,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Auto-join logic would go here

    toast.success('Pod created successfully!');
    return data;
  };

  const joinPod = async (podId: string) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await (supabase as any)
      .from('pod_memberships')
      .insert({
        pod_id: podId,
        user_id: user.id,
        role: 'member'
      });

    if (error) throw error;

    // Update member count
    await (supabase as any).rpc('increment_pod_members', { pod_id: podId });

    toast.success('Joined pod successfully!');
  };

  const leavePod = async (podId: string) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await (supabase as any)
      .from('pod_memberships')
      .delete()
      .eq('pod_id', podId)
      .eq('user_id', user.id);

    if (error) throw error;

    // Update member count
    await (supabase as any).rpc('decrement_pod_members', { pod_id: podId });

    toast.success('Left pod successfully!');
  };

  const getPodMembers = async (podId: string) => {
    const { data, error } = await (supabase as any)
      .from('pod_memberships')
      .select(`
        *,
        profiles!pod_memberships_user_id_fkey(
          display_name,
          username
        )
      `)
      .eq('pod_id', podId)
      .order('joined_at');

    if (error) throw error;
    return data || [];
  };

  const seedInitialPods = async () => {
    // Check if pods already exist
    const { data: existingPods } = await supabase
      .from('community_pods')
      .select('id')
      .limit(1);

    if (existingPods && existingPods.length > 0) return;

    // Create initial pods
    const initialPods: PodInsert[] = [
      {
        name: 'Gujarat • Vegetables',
        description: 'Vegetable farming community in Gujarat region',
        location: 'Gujarat, India',
        crop_focus: 'vegetables',
        created_by: user?.id || '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'Maharashtra • Cotton',
        description: 'Cotton farming experts and newcomers',
        location: 'Maharashtra, India', 
        crop_focus: 'cotton',
        created_by: user?.id || '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'Organic • Mixed',
        description: 'Organic farming across all crop types',
        location: 'Pan-India',
        crop_focus: 'mixed',
        created_by: user?.id || '00000000-0000-0000-0000-000000000000'
      }
    ];

    const { error } = await (supabase as any)
      .from('community_pods')
      .insert(initialPods);

    if (error) console.error('Error seeding pods:', error);
  };

  return {
    loading,
    setLoading,
    getPods,
    createPod,
    joinPod,
    leavePod,
    getPodMembers,
    seedInitialPods,
  };
};