export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          chapter_id: string
          color: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          chapter_id: string
          color?: string
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          chapter_id?: string
          color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "badges_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          current_progress: number | null
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          current_progress?: number | null
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          current_progress?: number | null
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          message_type: string
          room_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          message_type?: string
          room_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          message_type?: string
          room_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_challenges: {
        Row: {
          challenge_type: string
          created_at: string
          description: string
          end_date: string
          id: string
          is_active: boolean | null
          participant_count: number | null
          start_date: string
          target_value: number | null
          title: string
          total_progress: number | null
          unit: string | null
        }
        Insert: {
          challenge_type: string
          created_at?: string
          description: string
          end_date: string
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          start_date: string
          target_value?: number | null
          title: string
          total_progress?: number | null
          unit?: string | null
        }
        Update: {
          challenge_type?: string
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          participant_count?: number | null
          start_date?: string
          target_value?: number | null
          title?: string
          total_progress?: number | null
          unit?: string | null
        }
        Relationships: []
      }
      community_pods: {
        Row: {
          created_at: string
          created_by: string
          crop_focus: Database["public"]["Enums"]["crop_type"] | null
          description: string | null
          id: string
          is_private: boolean | null
          location: string
          member_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          crop_focus?: Database["public"]["Enums"]["crop_type"] | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          location: string
          member_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          crop_focus?: Database["public"]["Enums"]["crop_type"] | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          location?: string
          member_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"] | null
          id: string
          location: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at: string
          upvotes: number | null
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"] | null
          id?: string
          location?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at?: string
          upvotes?: number | null
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"] | null
          id?: string
          location?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          updated_at?: string
          upvotes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      expert_questions: {
        Row: {
          answer: string | null
          answered_at: string | null
          answered_by: string | null
          created_at: string
          id: string
          is_answered: boolean | null
          question: string
          session_id: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          created_at?: string
          id?: string
          is_answered?: boolean | null
          question: string
          session_id?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          created_at?: string
          id?: string
          is_answered?: boolean | null
          question?: string
          session_id?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_questions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "expert_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_sessions: {
        Row: {
          created_at: string
          crop_focus: Database["public"]["Enums"]["crop_type"] | null
          current_participants: number | null
          description: string | null
          duration_minutes: number | null
          expert_id: string
          id: string
          max_participants: number | null
          scheduled_at: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          crop_focus?: Database["public"]["Enums"]["crop_type"] | null
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number | null
          expert_id: string
          id?: string
          max_participants?: number | null
          scheduled_at: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          crop_focus?: Database["public"]["Enums"]["crop_type"] | null
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number | null
          expert_id?: string
          id?: string
          max_participants?: number | null
          scheduled_at?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
          threads_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
          threads_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
          threads_count?: number | null
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          is_solution: boolean | null
          thread_id: string
          updated_at: string
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          thread_id: string
          updated_at?: string
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          thread_id?: string
          updated_at?: string
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_activity_at: string | null
          posts_count: number | null
          title: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_activity_at?: string | null
          posts_count?: number | null
          title: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_activity_at?: string | null
          posts_count?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          journal_entry_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          journal_entry_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          journal_entry_id?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          entry_type: string
          id: string
          is_public: boolean
          pod_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          entry_type?: string
          id?: string
          is_public?: boolean
          pod_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          entry_type?: string
          id?: string
          is_public?: boolean
          pod_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          chapter_id: string
          content: string
          created_at: string
          duration_minutes: number | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          content: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          content?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_relationships: {
        Row: {
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"] | null
          ended_at: string | null
          id: string
          learner_id: string
          mentor_id: string
          started_at: string
          status: string
        }
        Insert: {
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"] | null
          ended_at?: string | null
          id?: string
          learner_id: string
          mentor_id: string
          started_at?: string
          status?: string
        }
        Update: {
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"] | null
          ended_at?: string | null
          id?: string
          learner_id?: string
          mentor_id?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pod_members: {
        Row: {
          id: string
          joined_at: string
          pod_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          pod_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          pod_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pod_members_pod_id_fkey"
            columns: ["pod_id"]
            isOneToOne: false
            referencedRelation: "community_pods"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_comment_id: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          is_before_image: boolean | null
          post_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_before_image?: boolean | null
          post_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_before_image?: boolean | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reaction_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reaction_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reaction_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      private_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          credits: number
          display_name: string | null
          id: string
          level: number | null
          points: number | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          display_name?: string | null
          id?: string
          level?: number | null
          points?: number | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          display_name?: string | null
          id?: string
          level?: number | null
          points?: number | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          created_at: string
          description: string | null
          emoji: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          points: number
          quest_type: Database["public"]["Enums"]["quest_type"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          points?: number
          quest_type: Database["public"]["Enums"]["quest_type"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          points?: number
          quest_type?: Database["public"]["Enums"]["quest_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          reason: string
          reported_content_id: string
          reported_content_type: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          reason: string
          reported_content_id: string
          reported_content_type: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          reason?: string
          reported_content_id?: string
          reported_content_type?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      swap_listings: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          is_available: boolean | null
          item_condition: string | null
          location: string | null
          title: string
          updated_at: string
          user_id: string
          wants_in_return: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          is_available?: boolean | null
          item_condition?: string | null
          location?: string | null
          title: string
          updated_at?: string
          user_id: string
          wants_in_return?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          is_available?: boolean | null
          item_condition?: string | null
          location?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          wants_in_return?: string | null
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          correct_answer: string
          created_at: string
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question_text: string
          test_id: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question_text: string
          test_id: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          order_index?: number
          question_text?: string
          test_id?: string
        }
        Relationships: []
      }
      tests: {
        Row: {
          chapter_id: string
          created_at: string
          description: string | null
          id: string
          passing_score: number | null
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          description?: string | null
          id?: string
          passing_score?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          description?: string | null
          id?: string
          passing_score?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_progress: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quest_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          date_assigned: string
          id: string
          quest_id: string
          status: Database["public"]["Enums"]["quest_status"]
          updated_at: string
          user_id: string
          week_start: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          date_assigned?: string
          id?: string
          quest_id: string
          status?: Database["public"]["Enums"]["quest_status"]
          updated_at?: string
          user_id: string
          week_start?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          date_assigned?: string
          id?: string
          quest_id?: string
          status?: Database["public"]["Enums"]["quest_status"]
          updated_at?: string
          user_id?: string
          week_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_quest_progress_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_test_attempts: {
        Row: {
          completed_at: string
          id: string
          passed: boolean
          score: number
          test_id: string
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          passed: boolean
          score: number
          test_id: string
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          passed?: boolean
          score?: number
          test_id?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      initialize_user_quests: {
        Args: { user_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      content_status: "active" | "reported" | "moderated" | "deleted"
      crop_type:
        | "wheat"
        | "rice"
        | "corn"
        | "tomato"
        | "potato"
        | "onion"
        | "carrot"
        | "lettuce"
        | "soybean"
        | "cotton"
        | "sugarcane"
        | "millet"
        | "barley"
        | "oats"
        | "other"
        | "vegetables"
        | "mixed"
      post_type:
        | "crop_showcase"
        | "field_journal"
        | "general"
        | "swap_listing"
        | "expert_question"
      quest_status: "not_started" | "in_progress" | "completed"
      quest_type: "daily" | "weekly" | "special"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_status: ["active", "reported", "moderated", "deleted"],
      crop_type: [
        "wheat",
        "rice",
        "corn",
        "tomato",
        "potato",
        "onion",
        "carrot",
        "lettuce",
        "soybean",
        "cotton",
        "sugarcane",
        "millet",
        "barley",
        "oats",
        "other",
        "vegetables",
        "mixed",
      ],
      post_type: [
        "crop_showcase",
        "field_journal",
        "general",
        "swap_listing",
        "expert_question",
      ],
      quest_status: ["not_started", "in_progress", "completed"],
      quest_type: ["daily", "weekly", "special"],
    },
  },
} as const
