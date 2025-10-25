import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategoriesStore } from '../stores/categoriesStorePersistent'
import { useAuth } from '../contexts/AuthContext'
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Play, 
  BookOpen, 
  Award,
  Calendar,
  Star,
  Zap,
  AlertCircle
} from 'lucide-react'

const DashboardPageNew: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { categories, loading, error, fetchCategories, clearError } = useCategoriesStore()

  useEffect(() => {
    // Cargar categorías cuando el componente se monte
    if (categories.length === 0 && !loading) {
      fetchCategories()
    }
  }, [categories.length, loading, fetchCategories])

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categoria/${categoryId}`)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'continue':
        // Lógica para continuar aprendizaje
        break
      case 'new':
        // Lógica para nuevo tema
        break
      case 'achievements':
        // Lógica para logros
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error al cargar datos</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => {
              clearError()
              fetchCategories()
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ¡Hola, {user?.display_name || user?.username || 'Usuario'}!
          </h1>
          <p className="text-gray-600">
            Continúa aprendiendo señas y mejora tus habilidades
          </p>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleQuickAction('continue')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Continuar Aprendiendo</h3>
              </div>
              <p className="text-gray-600">Resume tu última sesión</p>
            </button>

            <button
              onClick={() => handleQuickAction('new')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Nuevo Tema</h3>
              </div>
              <p className="text-gray-600">Explora una nueva categoría</p>
            </button>

            <button
              onClick={() => handleQuickAction('achievements')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Mis Logros</h3>
              </div>
              <p className="text-gray-600">Ver tus conquistas</p>
            </button>
          </div>
        </div>

        {/* Categorías de Aprendizaje */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorías de Aprendizaje</h2>
          <p className="text-gray-600 mb-6">
            Selecciona una categoría para comenzar a jugar y aprender nuevas señas.
          </p>
          
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay categorías disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>0/0 completado</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Comenzar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel de Progreso */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tu Progreso</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Puntos</h3>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Señas Aprendidas</h3>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Racha</h3>
              <p className="text-2xl font-bold text-yellow-600">0 días</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Nivel</h3>
              <p className="text-2xl font-bold text-purple-600">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPageNew
