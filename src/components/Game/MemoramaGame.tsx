import React, { useState, useEffect, useCallback } from 'react'
import { Sign } from '../../lib/supabase'
import MemoramaCard from './MemoramaCard'
import { RotateCcw, Trophy, Clock, Target } from 'lucide-react'

interface MemoramaGameProps {
  signs: Sign[]
  onGameComplete: (score: number, timeSpent: number) => void
  onExit: () => void
}

interface GameCard {
  id: string
  sign: Sign
  isFlipped: boolean
  isMatched: boolean
}

const MemoramaGame: React.FC<MemoramaGameProps> = ({
  signs,
  onGameComplete,
  onExit
}) => {
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)

  // Inicializar cartas del juego
  useEffect(() => {
    const gameCards: GameCard[] = []
    
    // Crear pares de cartas
    signs.forEach((sign, index) => {
      gameCards.push(
        { id: `${sign.id}-1`, sign, isFlipped: false, isMatched: false },
        { id: `${sign.id}-2`, sign, isFlipped: false, isMatched: false }
      )
    })

    // Mezclar cartas
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }, [signs])

  // Cronómetro
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameCompleted])

  // Verificar si el juego está completo
  useEffect(() => {
    if (matchedPairs === signs.length && signs.length > 0) {
      setGameCompleted(true)
      setGameStarted(false)
      onGameComplete(moves, timeElapsed)
    }
  }, [matchedPairs, signs.length, moves, timeElapsed, onGameComplete])

  const handleCardClick = useCallback((index: number) => {
    if (gameCompleted || cards[index].isMatched || flippedCards.includes(index)) {
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    // Actualizar estado de la carta
    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ))

    // Si se han volteado 2 cartas, verificar coincidencia
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.sign.id === secondCard.sign.id) {
        // Coincidencia encontrada
        setCards(prev => prev.map((card, i) => 
          i === firstIndex || i === secondIndex 
            ? { ...card, isMatched: true }
            : card
        ))
        setMatchedPairs(prev => prev + 1)
        setFlippedCards([])
      } else {
        // No hay coincidencia, voltear cartas después de un delay
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => 
            i === firstIndex || i === secondIndex 
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [cards, flippedCards, gameCompleted, gameStarted])

  const resetGame = () => {
    setCards(prev => prev.map(card => ({ ...card, isFlipped: false, isMatched: false })))
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimeElapsed(0)
    setGameStarted(false)
    setGameCompleted(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header del juego */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onExit}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Volver
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Memorama de Señas</h1>
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar
            </button>
          </div>

          {/* Estadísticas del juego */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-800">{moves}</div>
              <div className="text-sm text-blue-600">Movimientos</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-800">{matchedPairs}</div>
              <div className="text-sm text-green-600">Pares encontrados</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-800">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-purple-600">Tiempo</div>
            </div>
          </div>
        </div>

        {/* Grid de cartas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <MemoramaCard
              key={card.id}
              sign={card.sign}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(index)}
              disabled={gameCompleted}
            />
          ))}
        </div>

        {/* Mensaje de juego completado */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Felicitaciones!
              </h2>
              <p className="text-gray-600 mb-6">
                Has completado el memorama en {moves} movimientos y {formatTime(timeElapsed)}
              </p>
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Jugar de nuevo
                </button>
                <button
                  onClick={onExit}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Volver al menú
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoramaGame
