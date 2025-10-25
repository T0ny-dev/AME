// Función para crear datos de prueba
export const createTestUser = () => {
  return {
    email: 'test@aprendeseñas.com',
    password: '123456',
    name: 'Usuario de Prueba'
  }
}

// Función para mostrar información de prueba en la consola
export const showTestCredentials = () => {
  console.log('🔑 Credenciales de Prueba:')
  console.log('Email: test@aprendeseñas.com')
  console.log('Contraseña: 123456')
  console.log('')
  console.log('💡 También puedes usar "Continuar como Invitado" para probar sin registro')
}

