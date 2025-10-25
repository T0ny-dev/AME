import React, { useState } from 'react'
import { Category } from '../lib/supabase'
import { useCategories } from '../hooks/useCategories'
import CategoriesList from '../components/Categories/CategoriesList'
import ProgressPanel from '../components/Progress/ProgressPanel'
import MemoramaGame from '../components/Game/MemoramaGame'
import { useSigns } from '../hooks/useSigns'
import { useGameSession } from '../hooks/useGameSession'

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showGame, setShowGame] = useState(false)
  
  const { categories, progress, loading } = useCategories()
  const { signs } = useSigns(selectedCategory?.id || '')
  const { startGameSession, updateGameSession, calculateScore } = useGameSession()

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
    
    // Volver al menú después de un delay
    setTimeout(() => {
      setShowGame(false)
      setSelectedCategory(null)
    }, 3000)
  }

  const handleExitGame = () => {
    setShowGame(false)
    setSelectedCategory(null)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Aprende Lengua de Señas!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diviértete aprendiendo señas con nuestro memorama interactivo. 
            Elige una categoría y comienza tu aventura de aprendizaje.
          </p>
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

        {/* Información adicional */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aprende Jugando
              </h3>
              <p className="text-gray-600">
                Nuestro memorama hace que aprender señas sea divertido y efectivo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Progreso Personalizado
              </h3>
              <p className="text-gray-600">
                Gana puntos, sube de nivel y mantén tu racha de aprendizaje.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Logros y Desafíos
              </h3>
              <p className="text-gray-600">
                Desbloquea logros y compite con otros estudiantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
