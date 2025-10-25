import { useState, useEffect } from 'react'
import { supabase, Category, UserCategoryProgress, isSupabaseReady } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { seedAllData } from '../utils/seedData'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [progress, setProgress] = useState<UserCategoryProgress[]>([])
  const [loading, setLoading] = useState(true)
  const { user, refreshUserData } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      console.log('useCategories: Iniciando carga de datos...')
      setLoading(true)
      
      try {
        await fetchCategories()
        if (user) {
          await fetchUserProgress()
        }
      } catch (error) {
        console.error('useCategories: Error cargando datos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Timeout de seguridad más largo para consultas reales
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('useCategories: Timeout - verificando si hay datos...')
        // Solo cargar datos mock si realmente no hay categorías después del timeout
        if (categories.length === 0) {
          console.log('useCategories: No hay categorías después del timeout, cargando datos mock')
          loadMockData()
        }
        setLoading(false)
      }
    }, 5000) // 5 segundos timeout para dar más tiempo a las consultas reales

    return () => clearTimeout(timeout)
  }, [user])

  const loadMockData = () => {
    console.log('useCategories: Cargando datos mock...')
    const mockCategories: Category[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Abecedario',
        description: 'Aprende el alfabeto en señas',
        icon: 'abc',
        color: '#ef4444',
        order_index: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Saludos',
        description: 'Saludos básicos y cortesía',
        icon: '👋',
        color: '#10b981',
        order_index: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Números',
        description: 'Números del 1 al 20',
        icon: '123',
        color: '#3b82f6',
        order_index: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Emociones',
        description: 'Expresar sentimientos',
        icon: '😊',
        color: '#8b5cf6',
        order_index: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Familia',
        description: 'Miembros de la familia',
        icon: '👨‍👩‍👧‍👦',
        color: '#f59e0b',
        order_index: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Colores',
        description: 'Colores básicos',
        icon: '🌈',
        color: '#ec4899',
        order_index: 6,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    setCategories(mockCategories)
    setLoading(false)
    console.log('useCategories: Datos mock cargados exitosamente')
  }

  const fetchCategories = async () => {
    try {
      // Si Supabase no está configurado, usar datos mock
      if (!isSupabaseReady()) {
        console.log('useCategories: Usando datos mock - Supabase no configurado')
        loadMockData()
        return
      }

      console.log('useCategories: Consultando categorías desde Supabase...')
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index')

      if (error) {
        console.error('useCategories: Error en consulta Supabase:', error)
        throw error
      }
      
      console.log('useCategories: Respuesta de Supabase:', data?.length || 0, 'categorías')
      
      // Si no hay datos en Supabase, poblar con datos de prueba
      if (!data || data.length === 0) {
        console.log('useCategories: No hay datos en Supabase, poblando con datos de prueba...')
        await seedAllData()
        
        // Intentar cargar de nuevo después del seed
        const { data: newData, error: newError } = await supabase
          .from('categories')
          .select('*')
          .order('order_index')
        
        if (newError) {
          console.error('Error after seeding:', newError)
          loadMockData()
          return
        }
        
        if (newData && newData.length > 0) {
          setCategories(newData)
          console.log('useCategories: Datos cargados exitosamente después del seed:', newData.length, 'categorías')
          return
        } else {
          console.log('useCategories: Aún no hay datos después del seed, usando datos mock')
          loadMockData()
          return
        }
      }
      
      setCategories(data)
      console.log('useCategories: Datos cargados exitosamente desde Supabase:', data.length, 'categorías')
    } catch (error) {
      console.error('Error fetching categories:', error)
      // En caso de error, usar datos mock
      console.log('useCategories: Usando datos mock debido a error')
      loadMockData()
    }
  }

  const fetchUserProgress = async () => {
    if (!user) return

    try {
      // Si Supabase no está configurado, usar progreso mock
      if (!isSupabaseReady()) {
        console.log('useCategories: Usando progreso mock - Supabase no configurado')
        const mockProgress: UserCategoryProgress[] = [
          {
            id: '1',
            user_id: user.id,
            category_id: '1',
            completed_signs: 0,
            total_signs: 26,
            points_earned: 0,
            is_completed: false,
            completed_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            user_id: user.id,
            category_id: '2',
            completed_signs: 0,
            total_signs: 10,
            points_earned: 0,
            is_completed: false,
            completed_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setProgress(mockProgress)
        return
      }

      const { data, error } = await supabase
        .from('user_category_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      setProgress(data || [])
    } catch (error) {
      console.error('Error fetching user progress:', error)
      // En caso de error, usar progreso mock
      const mockProgress: UserCategoryProgress[] = [
        {
          id: '1',
          user_id: user.id,
          category_id: '1',
          completed_signs: 0,
          total_signs: 26,
          points_earned: 0,
          is_completed: false,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      setProgress(mockProgress)
    }
  }

  const getCategoryProgress = (categoryId: string) => {
    return progress.find(p => p.category_id === categoryId)
  }

  const updateCategoryProgress = async (categoryId: string, points: number) => {
    if (!user) return

    try {
      const existingProgress = progress.find(p => p.category_id === categoryId)
      
      if (existingProgress) {
        const { error } = await supabase
          .from('user_category_progress')
          .update({
            points_earned: existingProgress.points_earned + points,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('user_category_progress')
          .insert({
            user_id: user.id,
            category_id: categoryId,
            points_earned: points
          })

        if (error) throw error
      }

      await fetchUserProgress()
    } catch (error) {
      console.error('Error updating category progress:', error)
    }
  }

  const refreshAllData = async () => {
    console.log('useCategories: Refrescando todos los datos...')
    setLoading(true)
    try {
      await fetchCategories()
      if (user) {
        await fetchUserProgress()
      }
    } catch (error) {
      console.error('useCategories: Error refrescando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    categories,
    progress,
    loading,
    getCategoryProgress,
    updateCategoryProgress,
    refetch: fetchUserProgress,
    refreshAllData
  }
}
