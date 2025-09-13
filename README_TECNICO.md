# Documentación Técnica - ReservasApp

## Descripción General
ReservasApp es una aplicación móvil desarrollada con React Native y Expo, orientada a la gestión y reserva de espacios y productos. Utiliza Redux Toolkit para el manejo de estado global y RTK Query para la integración con APIs.

## Estructura del Proyecto
- **src/components/**: Componentes reutilizables de UI (FlatCards, header, iconos, imagenes, etc).
- **src/screens/**: Pantallas principales de la app (Login, Signup, Productos, Carrito, Perfil, etc).
- **src/store/**: Configuración de Redux, slices para carrito, usuario y tienda.
- **src/services/**: Lógica de acceso a APIs (autenticación, productos).
- **src/global/**: Colores, fuentes e imágenes globales.
- **src/navigation/**: Navegadores y stacks para la navegación entre pantallas.
- **assets/**: Imágenes y fuentes utilizadas en la app.

## Principales Tecnologías
- **React Native**: Framework principal para desarrollo móvil.
- **Expo**: Herramienta para facilitar el desarrollo y testing.
- **Redux Toolkit**: Manejo de estado global y lógica de negocio.
- **RTK Query**: Integración y cacheo de datos desde APIs.
- **@react-native-community/datetimepicker**: Selección de fechas.
- **react-native-vector-icons**: Iconografía.
- **SQLite**: Persistencia local.

## Funcionalidades Clave
- Autenticación de usuarios (login y registro).
- Visualización y búsqueda de productos y espacios por categoría.
- Reserva de productos/espacios con selección de fecha.
- Carrito de reservas con gestión individual de ítems.
- Persistencia local y sincronización con API.
- Navegación por tabs y stacks.

## Estructura de Estado (Redux)
- **cartSlice**: Maneja los ítems reservados, total y acciones para agregar/eliminar.
- **shopSlice**: Maneja productos, categorías y selección actual.
- **userSlice**: Maneja datos del usuario.

## Integración y API
- Acceso a datos mediante endpoints definidos en `services/shopApi.js` y `services/authApi.js`.

## Navegación
- Implementada con React Navigation, usando stacks y tabs para separar flujos (autenticación, tienda, carrito, perfil).

## Estilos y Temas
- Colores y fuentes definidos en `src/global/colors.js` y `src/global/fonts.js`.
- Imágenes centralizadas en `src/global/images.js` y carpeta `assets/`.

