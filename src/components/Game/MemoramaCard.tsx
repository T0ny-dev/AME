import React from 'react'
import { Sign } from '../../lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

interface MemoramaCardProps {
  sign: Sign
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled?: boolean
}

const MemoramaCard: React.FC<MemoramaCardProps> = ({
  sign,
  isFlipped,
  isMatched,
  onClick,
  disabled = false
}) => {
  return (
    <div
      className={`relative w-full h-32 cursor-pointer transform transition-all duration-300 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
      } ${isMatched ? 'opacity-60' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      <div className={`relative w-full h-full rounded-lg shadow-lg transition-transform duration-500 ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Cara frontal - Seña */}
        <div className={`absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white ${
          isFlipped ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="text-4xl mb-2">
            {sign.image_url ? (
              <img 
                src={sign.image_url} 
                alt={sign.word}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              '🤟'
            )}
          </div>
          <Eye className="w-6 h-6" />
        </div>

        {/* Cara trasera - Palabra */}
        <div className={`absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex flex-col items-center justify-center text-white ${
          isFlipped ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-2xl font-bold mb-1">
            {sign.word}
          </div>
          {sign.description && (
            <div className="text-sm text-center px-2">
              {sign.description}
            </div>
          )}
          <EyeOff className="w-6 h-6 mt-2" />
        </div>
      </div>

      {/* Indicador de coincidencia */}
      {isMatched && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="bg-green-500 text-white rounded-full p-2">
            ✓
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoramaCard
