import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  user_id: string;
  room_id: string;
  message: string;
  message_type: string;
  created_at: string;
}

export const useCommunityChat = (roomId: string = 'general') => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Load messages for the current room
  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (message: string) => {
    if (!user || !message.trim()) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          room_id: roomId,
          message: message.trim(),
          message_type: 'text'
        })
        .select('*')
        .single();

      if (error) throw error;

      // Add the new message to state immediately for instant UI feedback
      setMessages(prev => [...prev, data]);

      // Play sound if not muted
      if (!isMuted) {
        playNotificationSound();
      }

      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800; // High frequency beep
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'Chat sounds enabled' : 'Chat sounds muted');
  };

  // Set up real-time subscription
  useEffect(() => {
    loadMessages();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('chat_messages_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Only add if it's not from the current user (to avoid duplicates)
          if (newMessage.user_id !== user?.id) {
            setMessages(prev => [...prev, newMessage]);
            
            // Play sound for incoming messages if not muted
            if (!isMuted) {
              playNotificationSound();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, user?.id, isMuted]);

  return {
    messages,
    loading,
    isMuted,
    sendMessage,
    toggleMute,
    loadMessages
  };
};