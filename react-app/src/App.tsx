import { useState, useEffect } from 'react'
import { getPokemones } from './services/pokeService'
import type { Pokemon } from './types/types'
import PokemonCard from './components/PokemonCard'
import PokemonDetail from './components/PokemonDetail'

import './App.css'

function App() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const data = await getPokemones()
        setPokemones(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemones()
  }, [])

  if (loading) return <p>Cargando pokemones...</p>
  if (error) return <p>Error: {error}</p>

  // Vista de detalle
  if (selectedPokemon) {
    return (
      <PokemonDetail
        name={selectedPokemon}
        onBack={() => setSelectedPokemon(null)}
      />
    )
  }

  // Vista de lista
  return (
    <div>
      <h1>Lista de Pokemones</h1>
      <div className="pokemon-grid">
        {pokemones.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onClick={setSelectedPokemon}
          />
        ))}
      </div>
    </div>
  )
}

export default App
