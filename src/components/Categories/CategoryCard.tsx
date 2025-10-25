import React from 'react'
import { Category, UserCategoryProgress } from '../../lib/supabase'
import { CheckCircle, Lock, Star } from 'lucide-react'

interface CategoryCardProps {
  category: Category
  progress?: UserCategoryProgress
  onSelect: (category: Category) => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, progress, onSelect }) => {
  const isCompleted = progress?.is_completed || false
  const isLocked = false // Por ahora todas las categorías están desbloqueadas
  const progressPercentage = progress ? (progress.completed_signs / progress.total_signs) * 100 : 0

  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isLocked ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      onClick={() => !isLocked && onSelect(category)}
    >
      {/* Header con icono y estado */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: category.color || '#6366f1' }}
          >
            {category.icon}
          </div>
          
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {isLocked && (
              <Lock className="w-6 h-6 text-gray-400" />
            )}
            {progress && progress.points_earned > 0 && (
              <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                <Star className="w-4 h-4" />
                <span>{progress.points_earned}</span>
              </div>
            )}
          </div>
        </div>

        {/* Título y descripción */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {category.description}
        </p>
      </div>

      {/* Barra de progreso */}
      {progress && (
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
            <span>{progress.completed_signs}/{progress.total_signs}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer con botón de acción */}
      <div className="px-6 pb-6">
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isLocked
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
          disabled={isLocked}
        >
          {isLocked
            ? 'Bloqueado'
            : isCompleted
            ? 'Completado'
            : progress && progress.completed_signs > 0
            ? 'Continuar'
            : 'Comenzar'
          }
        </button>
      </div>
    </div>
  )
}

export default CategoryCard
