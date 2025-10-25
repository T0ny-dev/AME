# 🤟 AME - Aprende el Método en Señas

**Copyright © 2024 AME - Propietario: América de la Torre Jarra**

Una aplicación web educativa para aprender Lengua de Señas Mexicana (LSM) de forma interactiva y divertida.

## 📖 Acerca de AME

AME es un proyecto de inclusión social enfocado a fomentar el conocimiento, empatía y amor por la cultura de la comunidad silente (gente sorda) en nuestra sociedad. Nuestra plataforma combina tecnología avanzada con metodologías pedagógicas probadas para brindar material didáctico de calidad en Lengua de Señas Mexicana (LSM).

## 🌟 Características

- **Material Didáctico en LSM**: Contenido completo en Lengua de Señas Mexicana
- **Juego de Memorama Interactivo**: Aprende señas jugando
- **Categorías de Aprendizaje**: Abecedario, saludos, números y más
- **Sistema de Progreso**: Rastrea tu aprendizaje con puntos y logros
- **Diseño Responsivo**: Funciona en desktop y móvil
- **Autenticación**: Sistema de login seguro

## 🛠️ Tecnologías

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Iconos**: Lucide React

## 📋 Configuración

### 1. Requisitos

- Node.js 18+ y npm
- Cuenta en Supabase
- Git

### 2. Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd senas-app

# Instalar dependencias
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el archivo `migrations/01_database_setup.sql` en el SQL Editor
3. Configura las variables de entorno (ver `.env.example`)

### 4. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎮 Uso

1. **Iniciar Sesión**: Crea una cuenta o inicia sesión
2. **Seleccionar Categoría**: Elige una categoría de aprendizaje
3. **Jugar Memorama**: Encuentra los pares de señas y palabras
4. **Ganar Puntos**: Completa juegos para ganar puntos
5. **Seguir Progreso**: Ve tu progreso en el panel

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Categories/     # Componentes de categorías
│   ├── Game/           # Componentes del juego
│   ├── Layout/         # Componentes de layout
│   └── Progress/       # Componentes de progreso
├── contexts/           # Contextos de React
├── hooks/              # Hooks personalizados
├── lib/                # Configuración de Supabase
├── pages/              # Páginas principales
└── stores/             # Zustand stores
migrations/
└── 01_database_setup.sql  # Configuración de base de datos
```

## 📞 Contacto

- **Email**: alsm76084@gmail.com
- **Teléfono**: +52 899 124 6022
- **Facebook**: [AME Facebook](https://facebook.com)

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

**Copyright © 2024 AME - Propietario: América de la Torre Jarra**

## 🙏 Agradecimientos

Gracias a todos los que contribuyen a hacer la educación en lengua de señas más accesible.