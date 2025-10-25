import { useState, useEffect } from 'react'
import { supabase, Sign, UserSignProgress, isSupabaseReady } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useSigns = (categoryId: string) => {
  const [signs, setSigns] = useState<Sign[]>([])
  const [progress, setProgress] = useState<UserSignProgress[]>([])
  const [loading, setLoading] = useState(true)
  const { user, refreshUserData } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      if (categoryId) {
        setLoading(true)
        try {
          await fetchSigns()
          if (user) {
            await fetchUserProgress()
            // Refrescar datos del usuario después de cargar señas
            if (refreshUserData) {
              await refreshUserData()
            }
          }
        } catch (error) {
          console.error('useSigns: Error cargando datos:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadData()
  }, [categoryId, user])

  const fetchSigns = async () => {
    try {
      // Si Supabase no está configurado, usar datos mock
      if (!isSupabaseReady()) {
        console.log('useSigns: Usando datos mock - Supabase no configurado')
        const mockSigns: Sign[] = [
          {
            id: '1',
            category_id: categoryId,
            word: 'A',
            description: 'Seña para la letra A',
            image_url: null,
            gif_url: null,
            difficulty_level: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            category_id: categoryId,
            word: 'B',
            description: 'Seña para la letra B',
            image_url: null,
            gif_url: null,
            difficulty_level: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setSigns(mockSigns)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('signs')
        .select('*')
        .eq('category_id', categoryId)
        .order('difficulty_level')

      if (error) throw error
      setSigns(data || [])
    } catch (error) {
      console.error('Error fetching signs:', error)
      // En caso de error, usar datos mock
      const mockSigns: Sign[] = [
        {
          id: '1',
          category_id: categoryId,
          word: 'Ejemplo',
          description: 'Seña de ejemplo',
          image_url: null,
          gif_url: null,
          difficulty_level: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      setSigns(mockSigns)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProgress = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_sign_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('sign_id', signs.map(s => s.id))

      if (error) throw error
      setProgress(data || [])
    } catch (error) {
      console.error('Error fetching user progress:', error)
    }
  }

  const updateSignProgress = async (signId: string, isCorrect: boolean) => {
    if (!user) return

    try {
      const existingProgress = progress.find(p => p.sign_id === signId)
      
      if (existingProgress) {
        const { error } = await supabase
          .from('user_sign_progress')
          .update({
            times_practiced: existingProgress.times_practiced + 1,
            times_correct: existingProgress.times_correct + (isCorrect ? 1 : 0),
            times_incorrect: existingProgress.times_incorrect + (isCorrect ? 0 : 1),
            last_practiced: new Date().toISOString(),
            mastered: isCorrect && existingProgress.times_correct >= 2
          })
          .eq('id', existingProgress.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('user_sign_progress')
          .insert({
            user_id: user.id,
            sign_id: signId,
            times_practiced: 1,
            times_correct: isCorrect ? 1 : 0,
            times_incorrect: isCorrect ? 0 : 1,
            last_practiced: new Date().toISOString(),
            mastered: false
          })

        if (error) throw error
      }

      await fetchUserProgress()
    } catch (error) {
      console.error('Error updating sign progress:', error)
    }
  }

  const getSignProgress = (signId: string) => {
    return progress.find(p => p.sign_id === signId)
  }

  const refreshAllData = async () => {
    console.log('useSigns: Refrescando todos los datos...')
    setLoading(true)
    try {
      await fetchSigns()
      if (user) {
        await fetchUserProgress()
      }
    } catch (error) {
      console.error('useSigns: Error refrescando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    signs,
    progress,
    loading,
    updateSignProgress,
    getSignProgress,
    refetch: fetchUserProgress,
    refreshAllData
  }
}
