// Utilidad para poblar las tablas de Supabase con datos de prueba
import { supabase, isSupabaseReady } from '../lib/supabase'

export const seedCategories = async () => {
  if (!isSupabaseReady()) {
    console.log('seedData: Supabase no configurado, saltando seed')
    return
  }

  try {
    // Verificar si ya hay categorías
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1)

    if (existingCategories && existingCategories.length > 0) {
      console.log('seedData: Las categorías ya existen, saltando seed')
      return
    }

    console.log('seedData: Poblando categorías...')
    
    const categories = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Abecedario',
        description: 'Aprende el alfabeto en señas',
        icon: 'abc',
        color: '#ef4444',
        order_index: 1
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Saludos',
        description: 'Saludos básicos y cortesía',
        icon: '👋',
        color: '#10b981',
        order_index: 2
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Números',
        description: 'Números del 1 al 20',
        icon: '123',
        color: '#3b82f6',
        order_index: 3
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Emociones',
        description: 'Expresar sentimientos',
        icon: '😊',
        color: '#8b5cf6',
        order_index: 4
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Familia',
        description: 'Miembros de la familia',
        icon: '👨‍👩‍👧‍👦',
        color: '#f59e0b',
        order_index: 5
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Colores',
        description: 'Colores básicos',
        icon: '🌈',
        color: '#ec4899',
        order_index: 6
      }
    ]

    const { error } = await supabase
      .from('categories')
      .insert(categories)

    if (error) {
      console.error('Error seeding categories:', error)
    } else {
      console.log('seedData: Categorías insertadas exitosamente')
    }
  } catch (error) {
    console.error('Error in seedCategories:', error)
  }
}

export const seedSigns = async () => {
  if (!isSupabaseReady()) {
    console.log('seedData: Supabase no configurado, saltando seed')
    return
  }

  try {
    // Verificar si ya hay señas
    const { data: existingSigns } = await supabase
      .from('signs')
      .select('id')
      .limit(1)

    if (existingSigns && existingSigns.length > 0) {
      console.log('seedData: Las señas ya existen, saltando seed')
      return
    }

    console.log('seedData: Poblando señas...')
    
    const signs = [
      // Abecedario completo (27 letras del español)
      { id: '1', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'A', description: 'Seña para la letra A - Mano cerrada con el pulgar extendido hacia arriba', difficulty_level: 1 },
      { id: '2', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'B', description: 'Seña para la letra B - Mano abierta con los dedos juntos', difficulty_level: 1 },
      { id: '3', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'C', description: 'Seña para la letra C - Mano curvada en forma de C', difficulty_level: 1 },
      { id: '4', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'D', description: 'Seña para la letra D - Índice y pulgar formando círculo', difficulty_level: 1 },
      { id: '5', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'E', description: 'Seña para la letra E - Mano cerrada con el pulgar entre índice y medio', difficulty_level: 1 },
      { id: '6', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'F', description: 'Seña para la letra F - Índice y pulgar tocándose, otros dedos extendidos', difficulty_level: 1 },
      { id: '7', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'G', description: 'Seña para la letra G - Índice apuntando hacia arriba, otros dedos cerrados', difficulty_level: 1 },
      { id: '8', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'H', description: 'Seña para la letra H - Índice y medio extendidos, otros cerrados', difficulty_level: 1 },
      { id: '9', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'I', description: 'Seña para la letra I - Meñique extendido, otros dedos cerrados', difficulty_level: 1 },
      { id: '10', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'J', description: 'Seña para la letra J - Índice curvado como gancho', difficulty_level: 1 },
      { id: '11', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'K', description: 'Seña para la letra K - Índice y medio separados, pulgar extendido', difficulty_level: 1 },
      { id: '12', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'L', description: 'Seña para la letra L - Índice y pulgar en ángulo recto', difficulty_level: 1 },
      { id: '13', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'M', description: 'Seña para la letra M - Tres dedos extendidos (índice, medio, anular)', difficulty_level: 1 },
      { id: '14', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'N', description: 'Seña para la letra N - Índice y medio extendidos, otros cerrados', difficulty_level: 1 },
      { id: '15', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Ñ', description: 'Seña para la letra Ñ - Índice y medio extendidos con tilde', difficulty_level: 1 },
      { id: '16', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'O', description: 'Seña para la letra O - Mano cerrada en forma de círculo', difficulty_level: 1 },
      { id: '17', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'P', description: 'Seña para la letra P - Índice y pulgar formando P', difficulty_level: 1 },
      { id: '18', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Q', description: 'Seña para la letra Q - Índice y pulgar formando círculo, otros extendidos', difficulty_level: 1 },
      { id: '19', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'R', description: 'Seña para la letra R - Índice y medio cruzados', difficulty_level: 1 },
      { id: '20', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'S', description: 'Seña para la letra S - Puño cerrado', difficulty_level: 1 },
      { id: '21', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'T', description: 'Seña para la letra T - Puño con pulgar entre índice y medio', difficulty_level: 1 },
      { id: '22', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'U', description: 'Seña para la letra U - Índice y medio juntos, otros cerrados', difficulty_level: 1 },
      { id: '23', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'V', description: 'Seña para la letra V - Índice y medio separados en V', difficulty_level: 1 },
      { id: '24', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'W', description: 'Seña para la letra W - Tres dedos extendidos (índice, medio, anular)', difficulty_level: 1 },
      { id: '25', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'X', description: 'Seña para la letra X - Índice cruzado sobre medio', difficulty_level: 1 },
      { id: '26', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Y', description: 'Seña para la letra Y - Meñique y pulgar extendidos', difficulty_level: 1 },
      { id: '27', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Z', description: 'Seña para la letra Z - Índice trazando Z en el aire', difficulty_level: 1 },
      
      // Saludos
      { id: '28', category_id: '550e8400-e29b-41d4-a716-446655440002', word: 'Hola', description: 'Saludo básico', difficulty_level: 1 },
      { id: '29', category_id: '550e8400-e29b-41d4-a716-446655440002', word: 'Adiós', description: 'Despedida básica', difficulty_level: 1 },
      { id: '30', category_id: '550e8400-e29b-41d4-a716-446655440002', word: 'Gracias', description: 'Expresión de agradecimiento', difficulty_level: 1 },
      { id: '31', category_id: '550e8400-e29b-41d4-a716-446655440002', word: 'Por favor', description: 'Expresión de cortesía', difficulty_level: 1 },
      { id: '32', category_id: '550e8400-e29b-41d4-a716-446655440002', word: 'Perdón', description: 'Expresión de disculpa', difficulty_level: 1 },
      
      // Números
      { id: '33', category_id: '550e8400-e29b-41d4-a716-446655440003', word: '1', description: 'Número uno', difficulty_level: 1 },
      { id: '34', category_id: '550e8400-e29b-41d4-a716-446655440003', word: '2', description: 'Número dos', difficulty_level: 1 },
      { id: '35', category_id: '550e8400-e29b-41d4-a716-446655440003', word: '3', description: 'Número tres', difficulty_level: 1 },
      { id: '36', category_id: '550e8400-e29b-41d4-a716-446655440003', word: '4', description: 'Número cuatro', difficulty_level: 1 },
      { id: '37', category_id: '550e8400-e29b-41d4-a716-446655440003', word: '5', description: 'Número cinco', difficulty_level: 1 },
      
      // Emociones
      { id: '38', category_id: '550e8400-e29b-41d4-a716-446655440004', word: 'Feliz', description: 'Expresión de felicidad', difficulty_level: 1 },
      { id: '39', category_id: '550e8400-e29b-41d4-a716-446655440004', word: 'Triste', description: 'Expresión de tristeza', difficulty_level: 1 },
      { id: '40', category_id: '550e8400-e29b-41d4-a716-446655440004', word: 'Enojado', description: 'Expresión de enojo', difficulty_level: 1 },
      { id: '41', category_id: '550e8400-e29b-41d4-a716-446655440004', word: 'Sorprendido', description: 'Expresión de sorpresa', difficulty_level: 1 },
      { id: '42', category_id: '550e8400-e29b-41d4-a716-446655440004', word: 'Asustado', description: 'Expresión de miedo', difficulty_level: 1 },
      
      // Familia
      { id: '43', category_id: '550e8400-e29b-41d4-a716-446655440005', word: 'Mamá', description: 'Madre', difficulty_level: 1 },
      { id: '44', category_id: '550e8400-e29b-41d4-a716-446655440005', word: 'Papá', description: 'Padre', difficulty_level: 1 },
      { id: '45', category_id: '550e8400-e29b-41d4-a716-446655440005', word: 'Hermano', description: 'Hermano varón', difficulty_level: 1 },
      { id: '46', category_id: '550e8400-e29b-41d4-a716-446655440005', word: 'Hermana', description: 'Hermana mujer', difficulty_level: 1 },
      { id: '47', category_id: '550e8400-e29b-41d4-a716-446655440005', word: 'Abuelo', description: 'Abuelo', difficulty_level: 1 },
      
      // Colores
      { id: '48', category_id: '550e8400-e29b-41d4-a716-446655440006', word: 'Rojo', description: 'Color rojo', difficulty_level: 1 },
      { id: '49', category_id: '550e8400-e29b-41d4-a716-446655440006', word: 'Azul', description: 'Color azul', difficulty_level: 1 },
      { id: '50', category_id: '550e8400-e29b-41d4-a716-446655440006', word: 'Verde', description: 'Color verde', difficulty_level: 1 },
      { id: '51', category_id: '550e8400-e29b-41d4-a716-446655440006', word: 'Amarillo', description: 'Color amarillo', difficulty_level: 1 },
      { id: '52', category_id: '550e8400-e29b-41d4-a716-446655440006', word: 'Negro', description: 'Color negro', difficulty_level: 1 }
    ]

    const { error } = await supabase
      .from('signs')
      .insert(signs)

    if (error) {
      console.error('Error seeding signs:', error)
    } else {
      console.log('seedData: Señas insertadas exitosamente')
    }
  } catch (error) {
    console.error('Error in seedSigns:', error)
  }
}

export const seedAchievements = async () => {
  if (!isSupabaseReady()) {
    console.log('seedData: Supabase no configurado, saltando seed')
    return
  }

  try {
    // Verificar si ya hay logros
    const { data: existingAchievements } = await supabase
      .from('achievements')
      .select('id')
      .limit(1)

    if (existingAchievements && existingAchievements.length > 0) {
      console.log('seedData: Los logros ya existen, saltando seed')
      return
    }

    console.log('seedData: Poblando logros...')
    
    const achievements = [
      {
        id: '1',
        name: 'Primer Paso',
        description: 'Completa tu primera categoría',
        icon: '🏆',
        points_reward: 50,
        condition_type: 'category_completed',
        condition_value: 1
      },
      {
        id: '2',
        name: 'Estudiante Dedicado',
        description: 'Practica 10 señas',
        icon: '📚',
        points_reward: 25,
        condition_type: 'signs_practiced',
        condition_value: 10
      },
      {
        id: '3',
        name: 'Racha de 7 días',
        description: 'Mantén una racha de 7 días',
        icon: '🔥',
        points_reward: 100,
        condition_type: 'streak_days',
        condition_value: 7
      },
      {
        id: '4',
        name: 'Maestro del Abecedario',
        description: 'Domina el abecedario',
        icon: '🎓',
        points_reward: 200,
        condition_type: 'category_mastered',
        condition_value: 1
      },
      {
        id: '5',
        name: 'Coleccionista',
        description: 'Completa 3 categorías',
        icon: '🎯',
        points_reward: 150,
        condition_type: 'category_completed',
        condition_value: 3
      }
    ]

    const { error } = await supabase
      .from('achievements')
      .insert(achievements)

    if (error) {
      console.error('Error seeding achievements:', error)
    } else {
      console.log('seedData: Logros insertados exitosamente')
    }
  } catch (error) {
    console.error('Error in seedAchievements:', error)
  }
}

export const seedAlphabet = async () => {
  if (!isSupabaseReady()) {
    console.log('seedData: Supabase no configurado, saltando seed del abecedario')
    return
  }

  try {
    console.log('seedData: Poblando abecedario completo...')
    
    const alphabetSigns = [
      { id: '1', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'A', description: 'Seña para la letra A - Mano cerrada con el pulgar extendido hacia arriba', difficulty_level: 1 },
      { id: '2', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'B', description: 'Seña para la letra B - Mano abierta con los dedos juntos', difficulty_level: 1 },
      { id: '3', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'C', description: 'Seña para la letra C - Mano curvada en forma de C', difficulty_level: 1 },
      { id: '4', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'D', description: 'Seña para la letra D - Índice y pulgar formando círculo', difficulty_level: 1 },
      { id: '5', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'E', description: 'Seña para la letra E - Mano cerrada con el pulgar entre índice y medio', difficulty_level: 1 },
      { id: '6', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'F', description: 'Seña para la letra F - Índice y pulgar tocándose, otros dedos extendidos', difficulty_level: 1 },
      { id: '7', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'G', description: 'Seña para la letra G - Índice apuntando hacia arriba, otros dedos cerrados', difficulty_level: 1 },
      { id: '8', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'H', description: 'Seña para la letra H - Índice y medio extendidos, otros cerrados', difficulty_level: 1 },
      { id: '9', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'I', description: 'Seña para la letra I - Meñique extendido, otros dedos cerrados', difficulty_level: 1 },
      { id: '10', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'J', description: 'Seña para la letra J - Índice curvado como gancho', difficulty_level: 1 },
      { id: '11', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'K', description: 'Seña para la letra K - Índice y medio separados, pulgar extendido', difficulty_level: 1 },
      { id: '12', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'L', description: 'Seña para la letra L - Índice y pulgar en ángulo recto', difficulty_level: 1 },
      { id: '13', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'M', description: 'Seña para la letra M - Tres dedos extendidos (índice, medio, anular)', difficulty_level: 1 },
      { id: '14', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'N', description: 'Seña para la letra N - Índice y medio extendidos, otros cerrados', difficulty_level: 1 },
      { id: '15', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Ñ', description: 'Seña para la letra Ñ - Índice y medio extendidos con tilde', difficulty_level: 1 },
      { id: '16', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'O', description: 'Seña para la letra O - Mano cerrada en forma de círculo', difficulty_level: 1 },
      { id: '17', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'P', description: 'Seña para la letra P - Índice y pulgar formando P', difficulty_level: 1 },
      { id: '18', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Q', description: 'Seña para la letra Q - Índice y pulgar formando círculo, otros extendidos', difficulty_level: 1 },
      { id: '19', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'R', description: 'Seña para la letra R - Índice y medio cruzados', difficulty_level: 1 },
      { id: '20', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'S', description: 'Seña para la letra S - Puño cerrado', difficulty_level: 1 },
      { id: '21', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'T', description: 'Seña para la letra T - Puño con pulgar entre índice y medio', difficulty_level: 1 },
      { id: '22', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'U', description: 'Seña para la letra U - Índice y medio juntos, otros cerrados', difficulty_level: 1 },
      { id: '23', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'V', description: 'Seña para la letra V - Índice y medio separados en V', difficulty_level: 1 },
      { id: '24', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'W', description: 'Seña para la letra W - Tres dedos extendidos (índice, medio, anular)', difficulty_level: 1 },
      { id: '25', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'X', description: 'Seña para la letra X - Índice cruzado sobre medio', difficulty_level: 1 },
      { id: '26', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Y', description: 'Seña para la letra Y - Meñique y pulgar extendidos', difficulty_level: 1 },
      { id: '27', category_id: '550e8400-e29b-41d4-a716-446655440001', word: 'Z', description: 'Seña para la letra Z - Índice trazando Z en el aire', difficulty_level: 1 }
    ]

    // Primero eliminar señas existentes del abecedario si las hay
    await supabase
      .from('signs')
      .delete()
      .eq('category_id', '550e8400-e29b-41d4-a716-446655440001')

    const { error } = await supabase
      .from('signs')
      .insert(alphabetSigns)

    if (error) {
      console.error('Error seeding alphabet:', error)
    } else {
      console.log('seedData: Abecedario completo insertado exitosamente (27 letras)')
    }
  } catch (error) {
    console.error('Error in seedAlphabet:', error)
  }
}

export const seedAllData = async () => {
  console.log('seedData: Iniciando seed de datos...')
  await seedCategories()
  await seedSigns()
  await seedAchievements()
  console.log('seedData: Seed completado')
}
