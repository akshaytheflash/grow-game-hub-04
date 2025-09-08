import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface SwapListing {
  id: string;
  title: string;
  category: string;
  item_condition: string;
  location: string;
  description: string;
  wants_in_return: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

export const useSwapBoard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getSwapListings = async (location?: string): Promise<SwapListing[]> => {
    let query = supabase
      .from('swap_listings')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(listing => ({ ...listing, profiles: null }));
  };

  const createSwapListing = async (listingData: {
    title: string;
    category: string;
    item_condition: string;
    location: string;
    description: string;
    wants_in_return?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('swap_listings')
      .insert({
        title: listingData.title,
        category: listingData.category,
        item_condition: listingData.item_condition,
        location: listingData.location,
        description: listingData.description,
        wants_in_return: listingData.wants_in_return || null,
        user_id: user.id,
        is_available: true,
      })
      .select()
      .single();

    if (error) throw error;
    toast.success('Swap listing created successfully!');
    return data as SwapListing;
  };

  const updateListingStatus = async (listingId: string, isAvailable: boolean) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('swap_listings')
      .update({ is_available: isAvailable })
      .eq('id', listingId)
      .eq('user_id', user.id);

    if (error) throw error;
    toast.success(`Listing ${isAvailable ? 'activated' : 'deactivated'} successfully!`);
  };

  const contactLister = async (listingId: string, message: string) => {
    if (!user) throw new Error('User not authenticated');

    // For now, just show success message since we don't have swap_messages table yet
    toast.success('Contact feature coming soon! Use the community chat to connect.');
  };

  const seedInitialListings = async () => {
    // Check if listings already exist
    const { data: existingListings } = await supabase
      .from('swap_listings')
      .select('id')
      .limit(1);

    if (existingListings && existingListings.length > 0) return;

    const initialListings = [
      {
        title: 'Organic Tomato Seeds - Heritage Variety',
        category: 'seeds',
        item_condition: 'new',
        location: 'Pune, Maharashtra',
        description: 'High-yield heritage tomato variety, perfect for organic farming',
        wants_in_return: 'Looking for organic fertilizer or compost',
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        is_available: true,
      },
      {
        title: 'Used Drip Irrigation Kit',
        category: 'equipment',
        item_condition: 'good',
        location: 'Ahmedabad, Gujarat',
        description: 'Complete drip irrigation system for 1-acre farm, used for 2 seasons',
        wants_in_return: 'Looking for farming tools or seeds',
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        is_available: true,
      }
    ];

    const { error } = await supabase
      .from('swap_listings')
      .insert(initialListings);

    if (error) console.error('Error seeding swap listings:', error);
  };

  return {
    loading,
    setLoading,
    getSwapListings,
    createSwapListing,
    updateListingStatus,
    contactLister,
    seedInitialListings,
  };
};