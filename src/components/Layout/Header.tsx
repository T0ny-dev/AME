import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, User, Trophy } from 'lucide-react'

const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    // Prevenir múltiples ejecuciones
    if (isLoggingOut) {
      console.log('Header: Logout ya en progreso, ignorando...')
      return
    }

    try {
      setIsLoggingOut(true)
      console.log('Header: Intentando hacer logout...')
      
      // Llamar a la función de logout
      await signOut()
      console.log('Header: Logout exitoso')
      
      // Redirigir inmediatamente
      window.location.href = '/'
    } catch (error) {
      console.error('Header: Error en logout:', error)
      // Redirigir de todas formas
      window.location.href = '/'
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    console.log('Header: Usuario actual:', user ? 'Logueado' : 'No logueado')
  }, [user])

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 w-full shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/AME.png" alt="AME Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-bold text-gray-900">Aprende el Método en Señas</h1>
          </div>

          {/* Información del usuario */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Puntos y nivel */}
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                <Trophy className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">
                  {profile?.total_points || 0} pts
                </span>
              </div>

              {/* Avatar y menú */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-700" />
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`flex items-center space-x-2 transition-colors px-3 py-2 rounded-lg ${
                    isLoggingOut 
                      ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">
                    {isLoggingOut ? 'Saliendo...' : 'Salir'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
