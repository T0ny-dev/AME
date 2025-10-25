import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, UserProfile, isSupabaseReady } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInAsGuest: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  clearError: () => void
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    // Si Supabase no está configurado, simular estado de no autenticado
    if (!isSupabaseReady()) {
      console.log('Supabase no configurado - modo desarrollo')
      if (isMounted) {
        setLoading(false)
        setError(null)
        setUser(null)
        setProfile(null)
      }
      return
    }

    // Verificar si hay perfil local guardado
    const checkLocalProfile = () => {
      try {
        const localProfile = localStorage.getItem('user_profile')
        if (localProfile) {
          const profile = JSON.parse(localProfile)
          setProfile(profile)
          console.log('AuthContext: Perfil local cargado desde localStorage')
        }
      } catch (error) {
        console.log('AuthContext: Error cargando perfil local:', error)
      }
    }

    // Obtener sesión inicial con timeout
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          if (isMounted) {
            setLoading(false)
            setError('Error de autenticación')
          }
          return
        }
        
        if (isMounted) {
          setUser(session?.user ?? null)
          if (session?.user) {
            // Primero verificar perfil local
            checkLocalProfile()
            
            try {
              await fetchUserProfile(session.user.id)
            } catch (profileError) {
              console.error('Error fetching profile in initial session:', profileError)
              // Continuar sin perfil si hay error
            }
          }
          setLoading(false)
          setError(null)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
        if (isMounted) {
          setLoading(false)
          setError('Error de conexión con el servidor')
        }
      }
    }

    // Timeout de seguridad más largo para consultas reales
    const timeout = setTimeout(() => {
      if (isMounted) {
        console.log('Auth timeout - setting loading to false')
        setLoading(false)
        setError(null)
      }
    }, 5000) // 5 segundos timeout para dar más tiempo a las consultas

    getInitialSession()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        console.log('AuthContext: Auth state change:', event, session?.user?.id)
        setUser(session?.user ?? null)
        if (session?.user) {
          try {
            console.log('AuthContext: Usuario autenticado, cargando perfil...')
            await fetchUserProfile(session.user.id)
            console.log('AuthContext: Perfil cargado exitosamente')
          } catch (error) {
            console.error('AuthContext: Error fetching profile in auth change:', error)
          }
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('AuthContext: Obteniendo perfil del usuario:', userId)
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        
        // Si no existe el perfil, crear uno automáticamente
        if (error.code === 'PGRST116') {
          console.log('AuthContext: Perfil no encontrado, creando automáticamente...')
          await createUserProfile(userId)
          return
        }
        
        // Si hay error de permisos (406), crear perfil y continuar
        if (error.message?.includes('406') || error.message?.includes('Not Acceptable')) {
          console.log('AuthContext: Error de permisos, creando perfil...')
          await createUserProfile(userId)
          return
        }
        
        return
      }

      console.log('AuthContext: Perfil obtenido exitosamente:', data)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const createUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          username: `user_${userId.slice(0, 8)}`,
          display_name: 'Usuario',
          total_points: 0,
          level: 1,
          streak_days: 0,
          last_activity: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        
        // Si hay error de permisos, crear perfil local
        if (error.message?.includes('406') || error.message?.includes('Not Acceptable')) {
          console.log('AuthContext: Creando perfil local debido a permisos...')
          const localProfile = {
            id: userId,
            username: `user_${userId.slice(0, 8)}`,
            display_name: 'Usuario',
            avatar_url: null,
            total_points: 0,
            level: 1,
            streak_days: 0,
            last_activity: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          setProfile(localProfile)
          // Guardar en localStorage para persistencia
          localStorage.setItem('user_profile', JSON.stringify(localProfile))
          return
        }
        return
      }

      setProfile(data)
      console.log('AuthContext: Perfil creado exitosamente')
    } catch (error) {
      console.error('Error creating user profile:', error)
      
      // En caso de error, crear perfil local
      console.log('AuthContext: Creando perfil local debido a error...')
      const localProfile = {
        id: userId,
        username: `user_${userId.slice(0, 8)}`,
        display_name: 'Usuario',
        avatar_url: null,
        total_points: 0,
        level: 1,
        streak_days: 0,
        last_activity: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setProfile(localProfile)
      // Guardar en localStorage para persistencia
      localStorage.setItem('user_profile', JSON.stringify(localProfile))
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
    } catch (error: any) {
      console.error('Error signing in:', error)
      // Mejorar mensajes de error
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Credenciales inválidas. Verifica tu email y contraseña.')
      } else if (error.message?.includes('Email not confirmed')) {
        throw new Error('Por favor confirma tu email antes de iniciar sesión.')
      } else {
        throw new Error('Error al iniciar sesión. Inténtalo de nuevo.')
      }
    }
  }

  const signInAsGuest = async () => {
    try {
      if (!isSupabaseReady()) {
        // Modo desarrollo - simular login como invitado
        console.log('Modo desarrollo - simulando login como invitado')
        const mockUser = {
          id: 'guest-user',
          email: 'guest@example.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          aud: 'authenticated',
          role: 'authenticated',
          app_metadata: {},
          user_metadata: {},
          identities: [],
          factors: []
        } as User
        
        setUser(mockUser)
        setProfile({
          id: 'guest-user',
          username: 'invitado',
          display_name: 'Usuario Invitado',
          avatar_url: null,
          total_points: 0,
          level: 1,
          streak_days: 0,
          last_activity: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        return
      }

      const { error } = await supabase.auth.signInAnonymously()
      if (error) throw error
    } catch (error: any) {
      console.error('Error signing in as guest:', error)
      throw new Error('Error al iniciar sesión como invitado.')
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name
          }
        }
      })
      if (error) throw error

      // Crear perfil de usuario
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            username: name.toLowerCase().replace(/\s+/g, '_'),
            display_name: name,
            total_points: 0,
            level: 1,
            streak_days: 0,
            last_activity: new Date().toISOString()
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const signOut = async () => {
    try {
      console.log('AuthContext: Iniciando logout...')
      
      // Limpiar estado local INMEDIATAMENTE, sin esperar a Supabase
      console.log('AuthContext: Limpiando estado local inmediatamente')
      setUser(null)
      setProfile(null)
      setError(null)
      
      // Limpiar localStorage para evitar persistencia
      try {
        // Limpiar todas las claves relacionadas con Supabase
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb-') || key === 'user_profile') {
            localStorage.removeItem(key)
          }
        })
        console.log('AuthContext: LocalStorage limpiado')
      } catch (error) {
        console.log('AuthContext: Error limpiando localStorage:', error)
      }
      
      // Si Supabase está configurado, intentar logout (pero no bloquear)
      if (isSupabaseReady()) {
        console.log('AuthContext: Intentando logout con Supabase (no bloqueante)')
        // No esperar a que termine, solo iniciar el proceso
        supabase.auth.signOut().catch(error => {
          console.log('AuthContext: Error en Supabase logout (ignorado):', error)
        })
      }
      
      console.log('AuthContext: Logout completado - estado limpiado')
    } catch (error) {
      console.error('Error signing out:', error)
      // Asegurar que el estado se limpie de todas formas
      setUser(null)
      setProfile(null)
      setError(null)
      console.log('AuthContext: Estado limpiado después de error')
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      if (!isSupabaseReady()) {
        // Modo desarrollo - actualizar estado local
        setProfile(prev => prev ? { ...prev, ...updates } : null)
        return
      }

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      // Actualizar estado local
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const refreshUserData = async () => {
    if (!user) return
    
    try {
      console.log('AuthContext: Refrescando datos del usuario...')
      await fetchUserProfile(user.id)
      console.log('AuthContext: Datos del usuario actualizados')
    } catch (error) {
      console.error('AuthContext: Error refrescando datos del usuario:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signInAsGuest,
    signInWithGoogle,
    signOut,
    updateProfile,
    clearError,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
