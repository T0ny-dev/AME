-- AME - Aprende el Método en Señas
-- Database Setup Script
-- Copyright © 2024 AME - Propietario: América de la Torre Jarra

-- ========================================
-- CONFIGURACIÓN INICIAL
-- ========================================

-- Deshabilitar RLS temporalmente para facilitar el setup inicial
ALTER TABLE IF EXISTS public.achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.game_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.signs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_category_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_sign_progress DISABLE ROW LEVEL SECURITY;

-- ========================================
-- INSERTAR DATOS INICIALES
-- ========================================

-- Limpiar datos existentes (opcional, comentar si no deseas borrar)
DELETE FROM public.signs;
DELETE FROM public.categories;
DELETE FROM public.achievements;

-- Insertar categorías de aprendizaje
INSERT INTO public.categories (id, name, description, icon, color, order_index, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Abecedario', 'Aprende el alfabeto en señas', 'abc', '#ef4444', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440002', 'Saludos', 'Saludos básicos y cortesía', '👋', '#10b981', 2, now(), now()),
('550e8400-e29b-41d4-a716-446655440003', 'Números', 'Números del 1 al 20', '123', '#3b82f6', 3, now(), now()),
('550e8400-e29b-41d4-a716-446655440004', 'Emociones', 'Expresar sentimientos', '😊', '#8b5cf6', 4, now(), now()),
('550e8400-e29b-41d4-a716-446655440005', 'Familia', 'Miembros de la familia', '👨‍👩‍👧‍👦', '#f59e0b', 5, now(), now()),
('550e8400-e29b-41d4-a716-446655440006', 'Colores', 'Colores básicos', '🌈', '#ec4899', 6, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insertar abecedario completo (27 letras del español)
INSERT INTO public.signs (id, category_id, word, description, difficulty_level, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'A', 'Seña para la letra A - Mano cerrada con el pulgar extendido hacia arriba', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001', 'B', 'Seña para la letra B - Mano abierta con los dedos juntos', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', 'C', 'Seña para la letra C - Mano curvada en forma de C', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440001', 'D', 'Seña para la letra D - Índice y pulgar formando círculo', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440001', 'E', 'Seña para la letra E - Mano cerrada con el pulgar entre índice y medio', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440001', 'F', 'Seña para la letra F - Índice y pulgar tocándose, otros dedos extendidos', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440107', '550e8400-e29b-41d4-a716-446655440001', 'G', 'Seña para la letra G - Índice apuntando hacia arriba, otros dedos cerrados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440108', '550e8400-e29b-41d4-a716-446655440001', 'H', 'Seña para la letra H - Índice y medio extendidos, otros cerrados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440109', '550e8400-e29b-41d4-a716-446655440001', 'I', 'Seña para la letra I - Meñique extendido, otros dedos cerrados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440001', 'J', 'Seña para la letra J - Índice curvado como gancho', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440001', 'K', 'Seña para la letra K - Índice y medio separados, pulgar extendido', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440001', 'L', 'Seña para la letra L - Índice y pulgar en ángulo recto', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440001', 'M', 'Seña para la letra M - Tres dedos extendidos (índice, medio, anular)', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440114', '550e8400-e29b-41d4-a716-446655440001', 'N', 'Seña para la letra N - Índice y medio extendidos, otros cerrados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440115', '550e8400-e29b-41d4-a716-446655440001', 'Ñ', 'Seña para la letra Ñ - Índice y medio extendidos con tilde', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440116', '550e8400-e29b-41d4-a716-446655440001', 'O', 'Seña para la letra O - Mano cerrada en forma de círculo', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440117', '550e8400-e29b-41d4-a716-446655440001', 'P', 'Seña para la letra P - Índice y pulgar formando P', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440118', '550e8400-e29b-41d4-a716-446655440001', 'Q', 'Seña para la letra Q - Índice y pulgar formando círculo, otros extendidos', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440119', '550e8400-e29b-41d4-a716-446655440001', 'R', 'Seña para la letra R - Índice y medio cruzados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440001', 'S', 'Seña para la letra S - Puño cerrado', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440001', 'T', 'Seña para la letra T - Puño con pulgar entre índice y medio', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440001', 'U', 'Seña para la letra U - Índice y medio juntos, otros cerrados', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440123', '550e8400-e29b-41d4-a716-446655440001', 'V', 'Seña para la letra V - Índice y medio separados en V', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440124', '550e8400-e29b-41d4-a716-446655440001', 'W', 'Seña para la letra W - Tres dedos extendidos (índice, medio, anular)', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440125', '550e8400-e29b-41d4-a716-446655440001', 'X', 'Seña para la letra X - Índice cruzado sobre medio', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440126', '550e8400-e29b-41d4-a716-446655440001', 'Y', 'Seña para la letra Y - Meñique y pulgar extendidos', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440127', '550e8400-e29b-41d4-a716-446655440001', 'Z', 'Seña para la letra Z - Índice trazando Z en el aire', 1, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insertar señas de ejemplo para otras categorías
INSERT INTO public.signs (id, category_id, word, description, difficulty_level, created_at, updated_at) VALUES
-- Saludos
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440002', 'Hola', 'Saludo básico', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440002', 'Adiós', 'Despedida básica', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Gracias', 'Expresión de agradecimiento', 1, now(), now()),

-- Números
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440003', '1', 'Número uno', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440003', '2', 'Número dos', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440303', '550e8400-e29b-41d4-a716-446655440003', '3', 'Número tres', 1, now(), now()),

-- Emociones
('550e8400-e29b-41d4-a716-446655440401', '550e8400-e29b-41d4-a716-446655440004', 'Feliz', 'Expresión de felicidad', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440402', '550e8400-e29b-41d4-a716-446655440004', 'Triste', 'Expresión de tristeza', 1, now(), now()),

-- Familia
('550e8400-e29b-41d4-a716-446655440501', '550e8400-e29b-41d4-a716-446655440005', 'Mamá', 'Madre', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440502', '550e8400-e29b-41d4-a716-446655440005', 'Papá', 'Padre', 1, now(), now()),

-- Colores
('550e8400-e29b-41d4-a716-446655440601', '550e8400-e29b-41d4-a716-446655440006', 'Rojo', 'Color rojo', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440602', '550e8400-e29b-41d4-a716-446655440006', 'Azul', 'Color azul', 1, now(), now()),
('550e8400-e29b-41d4-a716-446655440603', '550e8400-e29b-41d4-a716-446655440006', 'Verde', 'Color verde', 1, now(), now())
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- VERIFICACIÓN
-- ========================================

-- Verificar datos insertados
SELECT 'Categorías insertadas:', COUNT(*) FROM public.categories;
SELECT 'Señas insertadas:', COUNT(*) FROM public.signs;
SELECT 'Abecedario:', COUNT(*) FROM public.signs WHERE category_id = '550e8400-e29b-41d4-a716-446655440001';

-- ========================================
-- FIN DEL SCRIPT
-- ========================================
