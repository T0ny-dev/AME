import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Hand, Brain, Trophy, Users, ArrowRight, Play } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const LandingPage: React.FC = () => {
  const { signInAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleGuestLogin = async () => {
    try {
      await signInAsGuest()
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión como invitado:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/AME.png" alt="AME Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-gray-900 hidden md:block">Aprende el Método en Señas</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img src="/AME.png" alt="AME Logo" className="h-32 w-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Material Didáctico en
              <span className="block text-red-600">LSM (Lengua de Señas Mexicana)</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Descubre el fascinante mundo de la lengua de señas mexicana a través de juegos interactivos, 
              memoramas y desafíos que harán que el aprendizaje sea una experiencia inolvidable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGuestLogin}
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Comenzar como Invitado
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <Link 
                to="/register" 
                className="inline-flex items-center px-8 py-4 bg-blue-900 text-white text-lg font-semibold rounded-xl hover:bg-blue-800 transition-all shadow-lg"
              >
                Crear Cuenta
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Qué es AME?</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 mb-4">
                AME es un proyecto de inclusión social enfocado a fomentar el conocimiento, empatía y amor por la 
                cultura de la comunidad silente (gente sorda) en nuestra sociedad.
              </p>
              <p className="text-lg text-gray-600">
                Nuestra plataforma combina tecnología avanzada con metodologías pedagógicas probadas para brindar 
                material didáctico de calidad en Lengua de Señas Mexicana (LSM).
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir AME?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aprendizaje Interactivo
              </h3>
              <p className="text-gray-700">
                Juegos y actividades que mantienen tu atención y mejoran la retención
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sistema de Logros
              </h3>
              <p className="text-gray-700">
                Gana puntos, desbloquea logros y mantén tu motivación alta
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comunidad Inclusiva
              </h3>
              <p className="text-gray-700">
                Conecta con otros estudiantes y comparte tu progreso
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hand className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Señas Auténticas
              </h3>
              <p className="text-gray-700">
                Aprende de instructores certificados y contenido verificado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-red-600">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar tu aventura?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            Únete y aprende Lengua de Señas Mexicana de forma divertida e interactiva
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Crear Cuenta Gratis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/AME.png" alt="AME Logo" className="h-10 w-auto" />
              </div>
              <p className="text-white/70">
                Proyecto de inclusión social para fomentar el conocimiento y amor por la cultura de la comunidad silente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-white/70 hover:text-white transition-colors">Iniciar Sesión</Link></li>
                <li><Link to="/register" className="text-white/70 hover:text-white transition-colors">Registrarse</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114.243 5.757zm-8.486 7.486a4 4 0 115.486-5.486 4 4 0 01-5.486 5.486z" clipRule="evenodd" />
                  </svg>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Facebook</a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:alsm76084@gmail.com" className="text-white/70 hover:text-white transition-colors">alsm76084@gmail.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="tel:+528991246022" className="text-white/70 hover:text-white transition-colors">+52 899 124 6022</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 AME. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
