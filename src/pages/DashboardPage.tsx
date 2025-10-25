import React, { useState, useEffect } from 'react'
import { Category } from '../lib/supabase'
import { useCategories } from '../hooks/useCategories'
import { useSigns } from '../hooks/useSigns'
import { useGameSession } from '../hooks/useGameSession'
import { useAuth } from '../contexts/AuthContext'
import { seedAlphabet } from '../utils/seedData'
import CategoriesList from '../components/Categories/CategoriesList'
import ProgressPanel from '../components/Progress/ProgressPanel'
import MemoramaGame from '../components/Game/MemoramaGame'
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

const DashboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showGame, setShowGame] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  
  const { categories, progress, loading, refreshAllData } = useCategories()
  const { signs } = useSigns(selectedCategory?.id || '')
  const { startGameSession, updateGameSession, calculateScore } = useGameSession()
  const { error, clearError, user } = useAuth()

  // Recargar datos cuando el usuario esté disponible (solo una vez)
  useEffect(() => {
    if (user && refreshAllData && !hasInitialized) {
      console.log('DashboardPage: Usuario detectado, recargando datos...')
      setHasInitialized(true)
      refreshAllData()
    }
  }, [user, hasInitialized]) // Agregado hasInitialized para evitar recargas múltiples

  const handleCategorySelect = async (category: Category) => {
    setSelectedCategory(category)
    setShowGame(true)
    
    // Iniciar sesión de juego
    await startGameSession(category.id, 'memorama')
  }

  const handleGameComplete = async (moves: number, timeSpent: number) => {
    if (!selectedCategory) return

    const score = calculateScore(moves, timeSpent, signs.length)
    await updateGameSession(score, timeSpent, true)
    
    // Volver al dashboard después de un delay
    setTimeout(() => {
      setShowGame(false)
      setSelectedCategory(null)
    }, 3000)
  }

  const handleExitGame = () => {
    setShowGame(false)
    setSelectedCategory(null)
  }

  const handlePopulateAlphabet = async () => {
    try {
      console.log('DashboardPage: Poblando abecedario...')
      await seedAlphabet()
      // Recargar datos después de poblar
      if (refreshAllData) {
        await refreshAllData()
      }
      console.log('DashboardPage: Abecedario poblado exitosamente')
    } catch (error) {
      console.error('DashboardPage: Error poblando abecedario:', error)
    }
  }

  if (showGame && selectedCategory) {
    return (
      <MemoramaGame
        signs={signs}
        onGameComplete={handleGameComplete}
        onExit={handleExitGame}
      />
    )
  }

  // Calcular estadísticas
  const totalCategories = categories.length
  const completedCategories = progress.filter(p => p.is_completed).length
  const totalPoints = progress.reduce((sum, p) => sum + p.points_earned, 0)
  const currentStreak = 7 // Esto vendría de la base de datos

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header del Dashboard */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta! 👋
          </h1>
          <p className="text-xl text-gray-700">
            Continúa tu aventura de aprendizaje de lengua de señas
          </p>
        </div>

        {/* Botón de desarrollo para poblar abecedario */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">🔧 Panel de Desarrollo</h3>
              <p className="text-yellow-700">Poblar el abecedario con las 27 letras del español</p>
            </div>
            <button
              onClick={handlePopulateAlphabet}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Poblar Abecedario
            </button>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Puntos Totales</p>
                <p className="text-3xl font-bold text-gray-900">{totalPoints}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categorías Completadas</p>
                <p className="text-3xl font-bold text-gray-900">{completedCategories}/{totalCategories}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Racha Actual</p>
                <p className="text-3xl font-bold text-gray-900">{currentStreak} días</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nivel Actual</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <Play className="w-6 h-6 text-indigo-600 mr-3" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Continuar Aprendiendo</p>
                <p className="text-sm text-gray-600">Resume tu última sesión</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <BookOpen className="w-6 h-6 text-green-600 mr-3" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Nuevo Tema</p>
                <p className="text-sm text-gray-600">Explora una nueva categoría</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Award className="w-6 h-6 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Mis Logros</p>
                <p className="text-sm text-gray-600">Ver tus conquistas</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel de progreso */}
          <div className="lg:col-span-1">
            <ProgressPanel />
          </div>

          {/* Lista de categorías */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Categorías de Aprendizaje
              </h2>
              <p className="text-gray-600">
                Selecciona una categoría para comenzar a jugar y aprender nuevas señas.
              </p>
            </div>

            <CategoriesList
              categories={categories}
              progress={progress}
              onCategorySelect={handleCategorySelect}
              loading={loading}
            />
          </div>
        </div>

        {/* Progreso reciente */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Progreso Reciente</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Completaste "Saludos"</p>
                  <p className="text-sm text-gray-600">Hace 2 horas • +50 puntos</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">+50 pts</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Nueva racha de 7 días</p>
                  <p className="text-sm text-gray-600">Ayer • +25 puntos de bonificación</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">+25 pts</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Desbloqueaste "Primer Paso"</p>
                  <p className="text-sm text-gray-600">Hace 3 días • Logro desbloqueado</p>
                </div>
              </div>
              <span className="text-purple-600 font-semibold">🏆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
