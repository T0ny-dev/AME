import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Sign } from '../lib/supabase'

interface SignsState {
  // Estado
  signs: Sign[]
  loading: boolean
  error: string | null
  currentCategoryId: string | null
  lastFetch: number | null
  
  // Acciones
  fetchSignsByCategory: (categoryId: string) => Promise<void>
  clearSigns: () => void
  clearError: () => void
  getSignsByCategory: (categoryId: string) => Sign[]
}

// Datos mock para el abecedario
const getMockSignsForCategory = (categoryId: string): Sign[] => {
  const now = new Date().toISOString()
  
  // Abecedario completo
  if (categoryId === '550e8400-e29b-41d4-a716-446655440001') {
    return [
      { id: '1', category_id: categoryId, word: 'A', description: 'Seña para la letra A - Mano cerrada con el pulgar extendido hacia arriba', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '2', category_id: categoryId, word: 'B', description: 'Seña para la letra B - Mano abierta con los dedos juntos', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '3', category_id: categoryId, word: 'C', description: 'Seña para la letra C - Mano curvada en forma de C', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '4', category_id: categoryId, word: 'D', description: 'Seña para la letra D - Índice y pulgar formando círculo', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '5', category_id: categoryId, word: 'E', description: 'Seña para la letra E - Mano cerrada con el pulgar entre índice y medio', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '6', category_id: categoryId, word: 'F', description: 'Seña para la letra F - Índice y pulgar tocándose, otros dedos extendidos', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '7', category_id: categoryId, word: 'G', description: 'Seña para la letra G - Índice apuntando hacia arriba, otros dedos cerrados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '8', category_id: categoryId, word: 'H', description: 'Seña para la letra H - Índice y medio extendidos, otros cerrados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '9', category_id: categoryId, word: 'I', description: 'Seña para la letra I - Meñique extendido, otros dedos cerrados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '10', category_id: categoryId, word: 'J', description: 'Seña para la letra J - Índice curvado como gancho', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '11', category_id: categoryId, word: 'K', description: 'Seña para la letra K - Índice y medio separados, pulgar extendido', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '12', category_id: categoryId, word: 'L', description: 'Seña para la letra L - Índice y pulgar en ángulo recto', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '13', category_id: categoryId, word: 'M', description: 'Seña para la letra M - Tres dedos extendidos (índice, medio, anular)', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '14', category_id: categoryId, word: 'N', description: 'Seña para la letra N - Índice y medio extendidos, otros cerrados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '15', category_id: categoryId, word: 'Ñ', description: 'Seña para la letra Ñ - Índice y medio extendidos con tilde', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '16', category_id: categoryId, word: 'O', description: 'Seña para la letra O - Mano cerrada en forma de círculo', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '17', category_id: categoryId, word: 'P', description: 'Seña para la letra P - Índice y pulgar formando P', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '18', category_id: categoryId, word: 'Q', description: 'Seña para la letra Q - Índice y pulgar formando círculo, otros extendidos', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '19', category_id: categoryId, word: 'R', description: 'Seña para la letra R - Índice y medio cruzados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '20', category_id: categoryId, word: 'S', description: 'Seña para la letra S - Puño cerrado', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '21', category_id: categoryId, word: 'T', description: 'Seña para la letra T - Puño con pulgar entre índice y medio', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '22', category_id: categoryId, word: 'U', description: 'Seña para la letra U - Índice y medio juntos, otros cerrados', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '23', category_id: categoryId, word: 'V', description: 'Seña para la letra V - Índice y medio separados en V', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '24', category_id: categoryId, word: 'W', description: 'Seña para la letra W - Tres dedos extendidos (índice, medio, anular)', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '25', category_id: categoryId, word: 'X', description: 'Seña para la letra X - Índice cruzado sobre medio', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '26', category_id: categoryId, word: 'Y', description: 'Seña para la letra Y - Meñique y pulgar extendidos', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '27', category_id: categoryId, word: 'Z', description: 'Seña para la letra Z - Índice trazando Z en el aire', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=face', gif_url: null, difficulty_level: 1, created_at: now, updated_at: now }
    ]
  }
  
  // Otras categorías
  return [
    { id: '1', category_id: categoryId, word: 'Ejemplo', description: 'Seña de ejemplo', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
    { id: '2', category_id: categoryId, word: 'Prueba', description: 'Seña de prueba', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now }
  ]
}

export const useSignsStore = create<SignsState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      signs: [],
      loading: false,
      error: null,
      currentCategoryId: null,
      lastFetch: null,

      // Acción para obtener señas de una categoría
      fetchSignsByCategory: async (categoryId: string) => {
        const { signs, currentCategoryId, lastFetch } = get()
        
        // Si ya tenemos señas para esta categoría y fue hace menos de 5 minutos, no recargar
        if (currentCategoryId === categoryId && signs.length > 0 && lastFetch && Date.now() - lastFetch < 5 * 60 * 1000) {
          console.log('SignsStore: Usando señas en caché para categoría', categoryId)
          return
        }

        set({ loading: true, error: null, currentCategoryId: categoryId })
        
        try {
          console.log(`SignsStore: Cargando señas para categoría ${categoryId} desde Supabase...`)
          
          // Intentar cargar desde Supabase
          const { supabase } = await import('../lib/supabase')
          const { data, error } = await supabase
            .from('signs')
            .select('*')
            .eq('category_id', categoryId)
            .order('word')

          if (error) {
            console.error('SignsStore: Error al cargar señas desde Supabase:', error)
            throw error
          }

          console.log(`SignsStore: Respuesta de Supabase: ${data?.length || 0} señas`)

          if (data && data.length > 0) {
            console.log('SignsStore: Señas cargadas desde Supabase:', data.length, 'señas')
            console.log('SignsStore: Primera seña:', data[0])
            console.log('SignsStore: image_url de primera seña:', data[0]?.image_url)
            set({ 
              signs: data, 
              loading: false, 
              lastFetch: Date.now(),
              error: null 
            })
            return
          }

          // Si no hay datos en Supabase, usar mock data como fallback
          console.log('SignsStore: No hay datos en Supabase, usando datos mock')
          const mockSigns = getMockSignsForCategory(categoryId)
          set({ 
            signs: mockSigns, 
            loading: false, 
            lastFetch: Date.now(),
            error: null 
          })
          
        } catch (error) {
          console.error('SignsStore: Error cargando señas:', error)
          // En caso de error, usar mock data como fallback
          console.log('SignsStore: Usando datos mock como fallback debido a error')
          const mockSigns = getMockSignsForCategory(categoryId)
          set({ 
            signs: mockSigns,
            loading: false,
            lastFetch: Date.now(),
            error: error instanceof Error ? error.message : 'Error desconocido'
          })
        }
      },

      // Obtener señas por categoría
      getSignsByCategory: (categoryId: string) => {
        const { signs, currentCategoryId } = get()
        if (currentCategoryId === categoryId) {
          return signs
        }
        return []
      },

      // Limpiar señas
      clearSigns: () => set({ signs: [], currentCategoryId: null }),

      // Limpiar error
      clearError: () => set({ error: null })
    }),
    {
      name: 'signs-storage', // nombre único para localStorage
      partialize: (state) => ({ 
        signs: state.signs,
        currentCategoryId: state.currentCategoryId,
        lastFetch: state.lastFetch 
      }), // solo persistir señas, categoría actual y lastFetch
    }
  )
)
