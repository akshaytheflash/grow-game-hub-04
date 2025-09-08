import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ForumThread {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  category_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  posts_count: number;
  last_activity_at: string;
  created_at: string;
  category?: {
    name: string;
    color: string;
  } | null;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  threads_count: number;
}

export interface ExpertSession {
  id: string;
  title: string;
  description: string | null;
  expert_id: string;
  scheduled_at: string;
  duration_minutes: number;
  max_participants: number;
  current_participants: number;
  status: string;
  crop_focus: string | null;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  user_id: string;
  post_type: string;
  crop_type: string | null;
  location: string | null;
  upvotes: number;
  comments_count: number;
  created_at: string;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
}

export const useCommunity = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Forum Functions
  const getForumCategories = async (): Promise<ForumCategory[]> => {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  };

  const getForumThreads = async (categoryId?: string): Promise<ForumThread[]> => {
    let query = supabase
      .from('forum_threads')
      .select(`
        *,
        category:forum_categories(name, color)
      `)
      .order('is_pinned', { ascending: false })
      .order('last_activity_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(thread => ({ ...thread, profiles: null }));
  };

  const createForumThread = async (threadData: {
    title: string;
    description: string;
    category_id: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('forum_threads')
      .insert({
        ...threadData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    toast.success('Thread created successfully!');
    return data;
  };

  // Expert Sessions Functions
  const getExpertSessions = async (): Promise<ExpertSession[]> => {
    const { data, error } = await supabase
      .from('expert_sessions')
      .select('*')
      .eq('status', 'scheduled')
      .order('scheduled_at');

    if (error) throw error;
    return (data || []).map(session => ({ ...session, profiles: null }));
  };

  const askExpertQuestion = async (questionData: {
    question: string;
    session_id?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('expert_questions')
      .insert({
        ...questionData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    toast.success('Question submitted successfully!');
    return data;
  };

  // Community Posts Functions
  const getCommunityPosts = async (): Promise<CommunityPost[]> => {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(post => ({ ...post, profiles: null }));
  };

  const createCommunityPost = async (postData: {
    title: string;
    content: string;
    post_type: string;
    crop_type?: string | null;
    location?: string | null;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        title: postData.title,
        content: postData.content,
        post_type: postData.post_type as any,
        crop_type: postData.crop_type as any,
        location: postData.location,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    toast.success('Post created successfully!');
    return data;
  };

  const upvotePost = async (postId: string) => {
    if (!user) throw new Error('User not authenticated');

    // Check if user already reacted
    const { data: existing } = await supabase
      .from('post_reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('reaction_type', 'upvote')
      .single();

    if (existing) {
      // Remove upvote
      const { error } = await supabase
        .from('post_reactions')
        .delete()
        .eq('id', existing.id);
      
      if (error) throw error;
      toast.success('Upvote removed');
    } else {
      // Add upvote
      const { error } = await supabase
        .from('post_reactions')
        .insert({
          post_id: postId,
          user_id: user.id,
          reaction_type: 'upvote'
        });
      
      if (error) throw error;
      toast.success('Post upvoted!');
    }
  };

  return {
    loading,
    setLoading,
    // Forum
    getForumCategories,
    getForumThreads,
    createForumThread,
    // Expert Sessions
    getExpertSessions,
    askExpertQuestion,
    // Community Posts
    getCommunityPosts,
    createCommunityPost,
    upvotePost,
  };
};