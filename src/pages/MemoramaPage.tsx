import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCategoriesStore } from '../stores/categoriesStorePersistent'
import { useSignsStore } from '../stores/signsStorePersistent'
import { useAuth } from '../contexts/AuthContext'

interface Card {
  id: string
  word: string
  description: string
  isFlipped: boolean
  isMatched: boolean
}

const MemoramaPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getCategoryById } = useCategoriesStore()
  const { signs, fetchSignsByCategory } = useSignsStore()
  
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const currentCategory = categoryId ? getCategoryById(categoryId) : null

  useEffect(() => {
    if (categoryId) {
      fetchSignsByCategory(categoryId)
    }
  }, [categoryId, fetchSignsByCategory])

  useEffect(() => {
    if (signs.length > 0) {
      initializeGame()
    }
  }, [signs])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameCompleted])

  const initializeGame = () => {
    // Crear pares de cartas (cada seña aparece 2 veces)
    const gameCards: Card[] = []
    
    // Tomar solo las primeras 8 señas para el memorama
    const selectedSigns = signs.slice(0, 8)
    
    selectedSigns.forEach((sign, index) => {
      // Crear dos cartas para cada seña
      gameCards.push({
        id: `${sign.id}-1`,
        word: sign.word,
        description: sign.description,
        isFlipped: false,
        isMatched: false
      })
      gameCards.push({
        id: `${sign.id}-2`,
        word: sign.word,
        description: sign.description,
        isFlipped: false,
        isMatched: false
      })
    })
    
    // Mezclar las cartas
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }

  const handleCardClick = (index: number) => {
    if (!gameStarted) {
      setGameStarted(true)
    }

    // No permitir click si ya hay 2 cartas volteadas, si la carta ya está volteada o emparejada
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return
    }

    // Agregar la carta actual a las cartas volteadas
    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    // Voltear la carta inmediatamente
    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ))

    // Si ahora tenemos 2 cartas volteadas, verificar si coinciden
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.word === secondCard.word) {
        // Las cartas coinciden - marcarlas como emparejadas
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => 
            i === firstIndex || i === secondIndex 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ))
          setMatchedPairs(prev => prev + 1)
          setFlippedCards([])
          
          // Verificar si el juego está completo
          if (matchedPairs + 1 === cards.length / 2) {
            setGameCompleted(true)
          }
        }, 500) // Pequeño delay para mostrar la coincidencia
      } else {
        // Las cartas no coinciden - voltearlas después de un delay
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => 
            i === firstIndex || i === secondIndex 
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
        }, 1500) // Tiempo para que el usuario vea las cartas
      }
    }
  }

  const handleRestart = () => {
    setCards([])
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTime(0)
    setGameStarted(false)
    setGameCompleted(false)
    initializeGame()
  }

  const handleBack = () => {
    navigate(`/categoria/${categoryId}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Categoría no encontrada</h1>
          <button
            onClick={() => navigate('/dashboard')}
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
            Memorama - {currentCategory.name}
          </h1>
          
          <button
            onClick={handleRestart}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reiniciar
          </button>
        </div>

        {/* Estadísticas del juego */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Movimientos</h3>
            <p className="text-2xl font-bold text-blue-600">{moves}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Pares Encontrados</h3>
            <p className="text-2xl font-bold text-green-600">{matchedPairs}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Tiempo</h3>
            <p className="text-2xl font-bold text-purple-600">{formatTime(time)}</p>
          </div>
        </div>

        {/* Mensaje de inicio */}
        {!gameStarted && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Memorama de {currentCategory.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                Encuentra las parejas de señas. Haz clic en cualquier carta para comenzar.
              </p>
              <div className="text-sm text-gray-500">
                {cards.length} cartas disponibles
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de victoria */}
        {gameCompleted && (
          <div className="text-center mb-8">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-2">¡Felicitaciones!</h2>
              <p className="mb-4">Has completado el memorama en {moves} movimientos y {formatTime(time)}</p>
              <button
                onClick={handleRestart}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Jugar de Nuevo
              </button>
            </div>
          </div>
        )}

        {/* Tablero del memorama */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  aspect-square rounded-lg cursor-pointer transition-all duration-300 transform
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-gray-200 hover:bg-gray-300'
                  }
                  ${card.isMatched 
                    ? 'bg-green-100 border-2 border-green-400' 
                    : ''
                  }
                  ${flippedCards.includes(index) 
                    ? 'scale-105 shadow-lg' 
                    : 'hover:scale-105'
                  }
                `}
              >
                <div className="w-full h-full flex items-center justify-center p-2">
                  {card.isFlipped || card.isMatched ? (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 mb-1">
                        {card.word}
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        {card.description}
                      </div>
                    </div>
                  ) : (
                    <div className="text-4xl">❓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoramaPage
