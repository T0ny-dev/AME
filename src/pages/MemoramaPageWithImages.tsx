import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCategoriesStore } from '../stores/categoriesStorePersistent'
import { useSignsStore } from '../stores/signsStorePersistent'
import { useAuth } from '../contexts/AuthContext'

interface Card {
  id: string
  word: string
  description: string
  image_url: string | null
  isFlipped: boolean
  isMatched: boolean
}

const MemoramaPageWithImages: React.FC = () => {
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
  const [isProcessing, setIsProcessing] = useState(false)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  
  const currentCategory = categoryId ? getCategoryById(categoryId) : null

  useEffect(() => {
    if (categoryId) {
      fetchSignsByCategory(categoryId)
    }
  }, [categoryId, fetchSignsByCategory])

  useEffect(() => {
    if (signs.length > 0) {
      console.log('MemoramaPageWithImages: Señas cargadas:', signs)
      console.log('MemoramaPageWithImages: Primera seña:', signs[0])
      console.log('MemoramaPageWithImages: image_url de primera seña:', signs[0]?.image_url)
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
    console.log('MemoramaPageWithImages: Señas seleccionadas para el juego:', selectedSigns)
    
    selectedSigns.forEach((sign, index) => {
      console.log(`MemoramaPageWithImages: Procesando seña ${index}:`, {
        word: sign.word,
        image_url: sign.image_url,
        hasImage: !!sign.image_url
      })
      
      // Crear dos cartas para cada seña
      gameCards.push({
        id: `${sign.id}-1`,
        word: sign.word,
        description: sign.description,
        image_url: sign.image_url,
        isFlipped: false,
        isMatched: false
      })
      gameCards.push({
        id: `${sign.id}-2`,
        word: sign.word,
        description: sign.description,
        image_url: sign.image_url,
        isFlipped: false,
        isMatched: false
      })
    })
    
    console.log('MemoramaPageWithImages: Cartas creadas:', gameCards)
    
    // Mezclar las cartas
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }

  const handleCardClick = (index: number) => {
    // No permitir clicks si estamos procesando o si la carta ya está volteada/emparejada
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) {
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    // Si ya hay 2 cartas volteadas, no permitir más clicks
    if (flippedCards.length >= 2) {
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
      setIsProcessing(true)
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
          setIsProcessing(false)
          
          // Verificar si el juego está completo
          if (matchedPairs + 1 === cards.length / 2) {
            setGameCompleted(true)
            setShowVictoryModal(true)
          }
        }, 800) // Delay para mostrar la coincidencia
      } else {
        // Las cartas no coinciden - voltearlas después de un delay
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => 
            i === firstIndex || i === secondIndex 
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
          setIsProcessing(false)
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
    setIsProcessing(false)
    setShowVictoryModal(false)
    initializeGame()
  }

  const handleAcceptVictory = () => {
    setShowVictoryModal(false)
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

        {/* Modal de victoria */}
        {showVictoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">¡Felicitaciones!</h2>
                <p className="text-gray-600 mb-2">
                  Has completado el memorama
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Movimientos:</span>
                      <p className="text-xl font-bold text-blue-600">{moves}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Tiempo:</span>
                      <p className="text-xl font-bold text-purple-600">{formatTime(time)}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleAcceptVictory}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Aceptar
                </button>
              </div>
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
                  aspect-square rounded-lg cursor-pointer relative
                  ${isProcessing ? 'pointer-events-none' : 'hover:scale-105'}
                  transition-all duration-300
                `}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Card Back - Logo AME */}
                <div 
                  className="absolute inset-0 rounded-lg border-2 border-gray-400 shadow-lg"
                  style={{
                    backgroundImage: 'url(/AME.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#f3f4f6',
                    transform: 'rotateY(0deg)',
                    backfaceVisibility: 'hidden'
                  }}
                />
                
                {/* Card Front - Contenido de la carta */}
                <div 
                  className={`
                    absolute inset-0 rounded-lg border-2 shadow-lg flex flex-col items-center justify-center p-2
                    ${card.isMatched ? 'bg-green-50 border-green-400' : 'bg-white border-gray-400'}
                  `}
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {card.image_url ? (
                    <div className="text-center w-full h-full flex flex-col items-center justify-center">
                      <div className="w-full h-3/4 flex items-center justify-center mb-2">
                        <img 
                          src={card.image_url} 
                          alt={`Seña para ${card.word}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="text-lg font-bold text-gray-800 mt-1">
                        {card.word}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 mb-1">
                        {card.word}
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        {card.description}
                      </div>
                    </div>
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

export default MemoramaPageWithImages
