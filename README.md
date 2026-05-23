# Pokedex Pokeapi 

Aplicación web para explorar, buscar, filtrar y comparar pokemon usando la pokeapi.

## Caracteristicas

- **Lista de Pokémon** - Navega entre varios pokemon con paginación.
- **Búsqueda** - Busca pokemon por nombre en tiempo real
- **Filtro por tipo** - Filtra pokemon por su tipo (fuego, agua, eléctrico, etc.)
- **Sistema de favoritos** - Marca tus pokemon favoritos (con persistencia en localStorage)
- **Vista detalle** - Información completa de cada pomkemon (tipos, estadísticas, habilidades)
- **Comparador 1vs1** - Compara dos pokemon lado a lado

## Tecnologías

- **React 18** 
- **TypeScript** 
- **Zustand** 
- **Vite** 
- **PokeAPI** 

##  Instalación

### Requisitos previos
- Node.js 16+ 
- npm, pnpm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/kimiyow/pokeapi-.git
cd pokeapi-react-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar Zustand** 
```bash
npm install zustand
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

##  Uso

### Búsqueda
Escribe en el input "Buscar por nombre..." para filtrar pokemon en tiempo real.

### Filtro por tipo
Selecciona un tipo en el dropdown para ver solo pokemon de ese tipo.

### Favoritos
Haz clic en la estrella (⭐) en cualquier tarjeta para marcarla como favorita. Los favoritos se guardan automáticamente en tu navegador.

### Vista detalle
Haz clic en una tarjeta para ver la información completa del pokemon:
- Imagen oficial
- Tipos
- Altura y peso
- Habilidades
- Estadísticas base con barras de progreso

### Comparador
Haz clic en el símbolo ⚔ en dos tarjetas diferentes para compararlas lado a lado.

## Autor

Proyecto educativo para aprender React, TypeScript y consumo de APIs.

---
