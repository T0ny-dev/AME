import { create } from 'zustand'
import { supabase, Category, Sign, isSupabaseReady } from '../lib/supabase'

interface CategoriesState {
  // Estado
  categories: Category[]
  loading: boolean
  error: string | null
  
  // Acciones
  fetchCategories: () => Promise<void>
  getCategoryById: (id: string) => Category | undefined
  clearError: () => void
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  // Estado inicial
  categories: [],
  loading: false,
  error: null,

  // Acción para obtener categorías
  fetchCategories: async () => {
    set({ loading: true, error: null })
    
    try {
      // Si Supabase no está configurado, usar datos mock
      if (!isSupabaseReady()) {
        console.log('CategoriesStore: Usando datos mock - Supabase no configurado')
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
        set({ categories: mockCategories, loading: false })
        return
      }

      console.log('CategoriesStore: Consultando categorías desde Supabase...')
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index')

      if (error) {
        console.error('CategoriesStore: Error en consulta Supabase:', error)
        throw error
      }
      
      console.log('CategoriesStore: Respuesta de Supabase:', data?.length || 0, 'categorías')
      
      if (!data || data.length === 0) {
        console.log('CategoriesStore: No hay datos en Supabase, usando datos mock')
        // Usar datos mock si no hay datos en Supabase
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
        set({ categories: mockCategories, loading: false })
        return
      }
      
      set({ categories: data, loading: false })
      console.log('CategoriesStore: Datos cargados exitosamente desde Supabase:', data.length, 'categorías')
      
    } catch (error) {
      console.error('CategoriesStore: Error cargando categorías:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false 
      })
    }
  },

  // Obtener categoría por ID
  getCategoryById: (id: string) => {
    const { categories } = get()
    return categories.find(category => category.id === id)
  },

  // Limpiar error
  clearError: () => set({ error: null })
}))
