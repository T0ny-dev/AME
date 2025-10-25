import { create } from 'zustand'
import { supabase, Sign, isSupabaseReady } from '../lib/supabase'

interface SignsState {
  // Estado
  signs: Sign[]
  loading: boolean
  error: string | null
  currentCategoryId: string | null
  
  // Acciones
  fetchSignsByCategory: (categoryId: string) => Promise<void>
  clearSigns: () => void
  clearError: () => void
}

export const useSignsStore = create<SignsState>((set, get) => ({
  // Estado inicial
  signs: [],
  loading: false,
  error: null,
  currentCategoryId: null,

  // Acción para obtener señas de una categoría
  fetchSignsByCategory: async (categoryId: string) => {
    set({ loading: true, error: null, currentCategoryId: categoryId })
    
    try {
      // Si Supabase no está configurado, usar datos mock
      if (!isSupabaseReady()) {
        console.log('SignsStore: Usando datos mock - Supabase no configurado')
        const mockSigns = getMockSignsForCategory(categoryId)
        set({ signs: mockSigns, loading: false })
        return
      }

      console.log(`SignsStore: Consultando señas para categoría ${categoryId} desde Supabase...`)
      const { data, error } = await supabase
        .from('signs')
        .select('*')
        .eq('category_id', categoryId)
        .order('difficulty_level')

      if (error) {
        console.error('SignsStore: Error en consulta Supabase:', error)
        throw error
      }
      
      console.log('SignsStore: Respuesta de Supabase:', data?.length || 0, 'señas')
      
      if (!data || data.length === 0) {
        console.log('SignsStore: No hay datos en Supabase, usando datos mock')
        const mockSigns = getMockSignsForCategory(categoryId)
        set({ signs: mockSigns, loading: false })
        return
      }
      
      set({ signs: data, loading: false })
      console.log('SignsStore: Datos cargados exitosamente desde Supabase:', data.length, 'señas')
      
    } catch (error) {
      console.error('SignsStore: Error cargando señas:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false 
      })
    }
  },

  // Limpiar señas
  clearSigns: () => set({ signs: [], currentCategoryId: null }),

  // Limpiar error
  clearError: () => set({ error: null })
}))

// Función para obtener datos mock según la categoría
function getMockSignsForCategory(categoryId: string): Sign[] {
  const now = new Date().toISOString()
  
  // Abecedario
  if (categoryId === '550e8400-e29b-41d4-a716-446655440001') {
    return [
      { id: '1', category_id: categoryId, word: 'A', description: 'Seña para la letra A', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '2', category_id: categoryId, word: 'B', description: 'Seña para la letra B', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '3', category_id: categoryId, word: 'C', description: 'Seña para la letra C', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '4', category_id: categoryId, word: 'D', description: 'Seña para la letra D', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '5', category_id: categoryId, word: 'E', description: 'Seña para la letra E', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '6', category_id: categoryId, word: 'F', description: 'Seña para la letra F', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '7', category_id: categoryId, word: 'G', description: 'Seña para la letra G', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '8', category_id: categoryId, word: 'H', description: 'Seña para la letra H', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '9', category_id: categoryId, word: 'I', description: 'Seña para la letra I', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '10', category_id: categoryId, word: 'J', description: 'Seña para la letra J', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '11', category_id: categoryId, word: 'K', description: 'Seña para la letra K', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '12', category_id: categoryId, word: 'L', description: 'Seña para la letra L', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '13', category_id: categoryId, word: 'M', description: 'Seña para la letra M', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '14', category_id: categoryId, word: 'N', description: 'Seña para la letra N', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '15', category_id: categoryId, word: 'Ñ', description: 'Seña para la letra Ñ', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '16', category_id: categoryId, word: 'O', description: 'Seña para la letra O', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '17', category_id: categoryId, word: 'P', description: 'Seña para la letra P', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '18', category_id: categoryId, word: 'Q', description: 'Seña para la letra Q', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '19', category_id: categoryId, word: 'R', description: 'Seña para la letra R', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '20', category_id: categoryId, word: 'S', description: 'Seña para la letra S', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '21', category_id: categoryId, word: 'T', description: 'Seña para la letra T', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '22', category_id: categoryId, word: 'U', description: 'Seña para la letra U', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '23', category_id: categoryId, word: 'V', description: 'Seña para la letra V', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '24', category_id: categoryId, word: 'W', description: 'Seña para la letra W', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '25', category_id: categoryId, word: 'X', description: 'Seña para la letra X', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '26', category_id: categoryId, word: 'Y', description: 'Seña para la letra Y', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
      { id: '27', category_id: categoryId, word: 'Z', description: 'Seña para la letra Z', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now }
    ]
  }
  
  // Otras categorías
  return [
    { id: '1', category_id: categoryId, word: 'Ejemplo', description: 'Seña de ejemplo', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now },
    { id: '2', category_id: categoryId, word: 'Prueba', description: 'Seña de prueba', image_url: null, gif_url: null, difficulty_level: 1, created_at: now, updated_at: now }
  ]
}
