import { useState } from 'react'
import { supabase, GameSession } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useGameSession = () => {
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null)
  const { user } = useAuth()

  const startGameSession = async (categoryId: string, gameType: string) => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          game_type: gameType,
          score: 0,
          time_spent: 0,
          completed: false
        })
        .select()
        .single()

      if (error) throw error
      setCurrentSession(data)
      return data
    } catch (error) {
      console.error('Error starting game session:', error)
      return null
    }
  }

  const updateGameSession = async (score: number, timeSpent: number, completed: boolean = true) => {
    if (!currentSession || !user) return

    try {
      const { error } = await supabase
        .from('game_sessions')
        .update({
          score,
          time_spent: timeSpent,
          completed,
          finished_at: new Date().toISOString()
        })
        .eq('id', currentSession.id)

      if (error) throw error

      // Actualizar puntos del usuario
      await updateUserPoints(score)

      setCurrentSession(null)
    } catch (error) {
      console.error('Error updating game session:', error)
    }
  }

  const updateUserPoints = async (points: number) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          total_points: supabase.raw('total_points + ?', [points]),
          last_activity: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating user points:', error)
    }
  }

  const calculateScore = (moves: number, timeSpent: number, totalPairs: number) => {
    // Fórmula de puntuación: menos movimientos y menos tiempo = más puntos
    const baseScore = totalPairs * 100
    const movePenalty = moves * 5
    const timePenalty = Math.floor(timeSpent / 10) * 2
    const finalScore = Math.max(0, baseScore - movePenalty - timePenalty)
    
    return finalScore
  }

  return {
    currentSession,
    startGameSession,
    updateGameSession,
    calculateScore
  }
}
