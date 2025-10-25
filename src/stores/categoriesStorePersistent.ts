import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from '../lib/supabase'

interface CategoriesState {
  // Estado
  categories: Category[]
  loading: boolean
  error: string | null
  lastFetch: number | null
  
  // Acciones
  fetchCategories: () => Promise<void>
  getCategoryById: (id: string) => Category | undefined
  clearError: () => void
  setCategories: (categories: Category[]) => void
}

// Datos mock para usar cuando Supabase no esté disponible
const getMockCategories = (): Category[] => [
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

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      categories: [],
      loading: false,
      error: null,
      lastFetch: null,

      // Acción para obtener categorías
      fetchCategories: async () => {
        const { categories, lastFetch } = get()
        
        // Si ya tenemos categorías y fue hace menos de 5 minutos, no recargar
        if (categories.length > 0 && lastFetch && Date.now() - lastFetch < 5 * 60 * 1000) {
          console.log('CategoriesStore: Usando categorías en caché')
          return
        }

        set({ loading: true, error: null })
        
        try {
          console.log('CategoriesStore: Cargando categorías...')
          
          // Por ahora, usar siempre datos mock para evitar problemas con Supabase
          console.log('CategoriesStore: Usando datos mock para desarrollo')
          const mockCategories = getMockCategories()
          
          set({ 
            categories: mockCategories, 
            loading: false, 
            lastFetch: Date.now(),
            error: null 
          })
          
          console.log('CategoriesStore: Datos mock cargados exitosamente:', mockCategories.length, 'categorías')
          
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
      clearError: () => set({ error: null }),

      // Establecer categorías manualmente
      setCategories: (categories: Category[]) => set({ categories })
    }),
    {
      name: 'categories-storage', // nombre único para localStorage
      partialize: (state) => ({ 
        categories: state.categories,
        lastFetch: state.lastFetch 
      }), // solo persistir categorías y lastFetch
    }
  )
)
