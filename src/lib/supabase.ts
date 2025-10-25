import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Verificar si las variables de entorno están configuradas
const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder') &&
  !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('placeholder')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para verificar si Supabase está configurado
export const isSupabaseReady = () => isSupabaseConfigured

// Tipos TypeScript para la base de datos
export interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface Sign {
  id: string
  category_id: string
  word: string
  description: string | null
  image_url: string | null
  gif_url: string | null
  difficulty_level: number
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  total_points: number
  level: number
  streak_days: number
  last_activity: string
  created_at: string
  updated_at: string
}

export interface UserCategoryProgress {
  id: string
  user_id: string
  category_id: string
  completed_signs: number
  total_signs: number
  points_earned: number
  is_completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface UserSignProgress {
  id: string
  user_id: string
  sign_id: string
  times_practiced: number
  times_correct: number
  times_incorrect: number
  last_practiced: string | null
  mastered: boolean
  created_at: string
  updated_at: string
}

export interface GameSession {
  id: string
  user_id: string
  category_id: string
  game_type: string
  score: number
  time_spent: number
  completed: boolean
  started_at: string
  finished_at: string | null
}

export interface Achievement {
  id: string
  name: string
  description: string | null
  icon: string | null
  points_reward: number
  condition_type: string
  condition_value: number
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
}
