import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Star, Trophy, Target, Flame } from 'lucide-react'

const ProgressPanel: React.FC = () => {
  const { profile } = useAuth()

  if (!profile) return null

  const getLevel = (points: number) => {
    return Math.floor(points / 1000) + 1
  }

  const getProgressToNextLevel = (points: number) => {
    const currentLevel = getLevel(points)
    const pointsInCurrentLevel = points % 1000
    return (pointsInCurrentLevel / 1000) * 100
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tu Progreso</h2>
      
      {/* Nivel y puntos */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-6 h-6" />
            <span className="font-medium">Nivel</span>
          </div>
          <div className="text-3xl font-bold">{getLevel(profile.total_points)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-6 h-6" />
            <span className="font-medium">Puntos</span>
          </div>
          <div className="text-3xl font-bold">{profile.total_points}</div>
        </div>
      </div>

      {/* Barra de progreso al siguiente nivel */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso al siguiente nivel</span>
          <span className="text-sm text-gray-500">
            {profile.total_points % 1000}/1000
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getProgressToNextLevel(profile.total_points)}%` }}
          />
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-800">Racha</span>
          </div>
          <div className="text-2xl font-bold text-orange-800">{profile.streak_days} días</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Última actividad</span>
          </div>
          <div className="text-sm text-blue-600">
            {new Date(profile.last_activity).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPanel
