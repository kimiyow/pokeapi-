import { useState, useEffect} from 'react'
import { getPokemones } from './services/pokeService'
import type { Pokemon } from './types/types'

import './App.css'

function App() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]) // Estado para almacenar la lista de pokemones
  const [error, setError] = useState<string|null>(null)  //
  const [loading, setLoading] = useState<boolean>(true)

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


  if (loading) {
    return <p>Cargando pokemones...</p>
  }
  
  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1>Lista de pokemones</h1>
      <ul>
        {pokemones.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
