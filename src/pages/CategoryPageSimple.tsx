import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCategoriesStore } from '../stores/categoriesStorePersistent'
import { useSignsStore } from '../stores/signsStorePersistent'

const CategoryPageSimple: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  // Stores
  const { categories, fetchCategories, getCategoryById } = useCategoriesStore()
  const { signs, fetchSignsByCategory } = useSignsStore()
  
  // Obtener categoría actual
  const currentCategory = categoryId ? getCategoryById(categoryId) : null

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      try {
        // Cargar categorías si no están cargadas
        if (categories.length === 0) {
          console.log('CategoryPage: Cargando categorías...')
          await fetchCategories()
        }
        
        // Cargar señas de la categoría
        if (categoryId) {
          console.log('CategoryPage: Cargando señas para categoría', categoryId)
          await fetchSignsByCategory(categoryId)
        }
      } catch (error) {
        console.error('CategoryPage: Error cargando datos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [categoryId, categories.length, fetchCategories, fetchSignsByCategory])

  const handleBack = () => {
    navigate('/dashboard')
  }

  const handleStartGame = () => {
    if (currentCategory) {
      navigate(`/memorama/${categoryId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando categoría...</p>
        </div>
      </div>
    )
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Categoría no encontrada</h1>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800">
            {currentCategory.name}
          </h1>
          
          <div></div> {/* Spacer */}
        </div>

        {/* Información de la categoría */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4"
              style={{ backgroundColor: currentCategory.color }}
            >
              {currentCategory.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentCategory.name}
              </h2>
              <p className="text-gray-600">
                {currentCategory.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {signs.length} señas disponibles
            </div>
            <button
              onClick={handleStartGame}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Comenzar Memorama
            </button>
          </div>
        </div>

        {/* Lista de señas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Señas de {currentCategory.name}
          </h3>
          
          {signs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay señas disponibles para esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signs.map((sign) => (
                <div
                  key={sign.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  {/* Imagen de la seña */}
                  {sign.image_url ? (
                    <div className="mb-3">
                      <img 
                        src={sign.image_url} 
                        alt={`Seña para ${sign.word}`}
                        className="w-full h-48 object-contain rounded-lg bg-white border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mb-3 h-48 flex items-center justify-center bg-white border border-gray-200 rounded-lg">
                      <div className="text-6xl text-gray-300">{sign.word}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {sign.word}
                    </h4>
                    <span className="text-sm text-gray-500">
                      Nivel {sign.difficulty_level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {sign.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPageSimple
