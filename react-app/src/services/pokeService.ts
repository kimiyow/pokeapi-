import type { Pokemon, PokemonDetail } from '../types/types';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemones = async(): Promise<Pokemon[]> => {
    const response = await fetch(`${API_URL}/pokemon?limit=151`);
  
    if (!response.ok) {
        throw new Error('Error al obtener los pokemones');
    }

    const data = await response.json();
    return data.results;
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
    const response = await fetch(`${API_URL}/pokemon/${name}`);

    if (!response.ok) {
        throw new Error('Error al obtener el detalle del pokemon');
    }

    return response.json();
};

export const searchPokemon = (pokemones: Pokemon[], query:string): Pokemon[] =>
{
    if(!query.trim()) return pokemones;

    return pokemones.filter(pokemon=>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
};

export const filterByType = async (pokemones: Pokemon[], type: string): Promise<Pokemon[]> =>{
    if(!type) return pokemones;

    const pokemonsByType = await Promise.all(
        pokemones.map(async (pokemon)=>{
            const detail = await getPokemonDetail(pokemon.name);
            return{
                ...pokemon,
                types: detail.types
            };
        })
    );

    return pokemonsByType.filter(pokemon =>
        pokemon.types?.some(t=> t.type.name === type)
    );
};
    