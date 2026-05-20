import { useState, useEffect } from 'react'
import { getPokemones, searchPokemon, filterByType } from './services/pokeService'
import type { Pokemon } from './types/types'
import { useFavoritesStore } from './store/favoritesStore'
import PokemonCard from './components/PokemonCard'
import PokemonDetailView from './components/PokemonDetail'

import './App.css'

const POKEMON_PER_PAGE = 50;

function App() {
    const [allPokemones, setAllPokemones] = useState<Pokemon[]>([])
    const [filteredPokemones, setFilteredPokemones] = useState<Pokemon[]>([])
    const [paginatedPokemones, setPaginatedPokemones] = useState<Pokemon[]>([])
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedPokemon, setSelectedPokemon] = useState<string|null>(null)
    
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('')
    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    
  
    const favorites = useFavoritesStore((state) => state.favorites)
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
    const isFavorite = useFavoritesStore((state) => state.isFavorite)

   
    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const data = await getPokemones()
                setAllPokemones(data)
                setFilteredPokemones(data)
                setCurrentPage(1)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPokemones()
    }, [])

  
    useEffect(() => {
        const applyFilters = async () => {
            let result = allPokemones;

            result = searchPokemon(result, searchQuery)

            if (selectedType) {
                result = await filterByType(result, selectedType)
            }

            if (showOnlyFavorites) {
                result = result.filter(pokemon => favorites.includes(pokemon.name))
            }

            setFilteredPokemones(result)
            setCurrentPage(1) 
        }

        applyFilters()
    }, [searchQuery, selectedType, allPokemones, showOnlyFavorites, favorites])

   
    useEffect(() => {
        const startIndex = (currentPage - 1) * POKEMON_PER_PAGE
        const endIndex = startIndex + POKEMON_PER_PAGE
        setPaginatedPokemones(filteredPokemones.slice(startIndex, endIndex))
    }, [filteredPokemones, currentPage])

   
    const totalPages = Math.ceil(filteredPokemones.length / POKEMON_PER_PAGE)

    if (loading) return <p>Cargando pokemones...</p>
    if (error) return <p>Error: {error}</p>


    if (selectedPokemon) {
        return (
            <PokemonDetailView
                name={selectedPokemon}
                onBack={() => setSelectedPokemon(null)}
            />
        )
    }

   
    return (
        <div className="app-container">
            <h1>Pokédex</h1>
            
            <div className="controls">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="type-select"
                >
                    <option value="">Todos los tipos</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="grass">Planta</option>
                    <option value="electric">Eléctrico</option>
                    <option value="ice">Hielo</option>
                    <option value="fighting">Lucha</option>
                    <option value="poison">Veneno</option>
                    <option value="ground">Tierra</option>
                    <option value="flying">Volador</option>
                    <option value="psychic">Psíquico</option>
                    <option value="bug">Bicho</option>
                    <option value="rock">Roca</option>
                    <option value="ghost">Fantasma</option>
                    <option value="dragon">Dragón</option>
                    <option value="dark">Siniestro</option>
                    <option value="steel">Acero</option>
                    <option value="fairy">Hada</option>
                </select>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={showOnlyFavorites}
                        onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                    />
                    Solo favoritos
                </label>
            </div>

            <p className="results-count">{filteredPokemones.length} Pokémon encontrados</p>

            <div className="pokemon-grid">
                {paginatedPokemones.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                        onClick={setSelectedPokemon}
                        isFavorite={isFavorite(pokemon.name)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>

       
            <div className="pagination">
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ← Anterior
                </button>

                <span className="pagination-info">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    )
}

export default App
