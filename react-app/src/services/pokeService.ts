import type { Pokemon, PokemonDetail } from '../types/types';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemones = async(): Promise<Pokemon[]> => {
    const response = await fetch(`${API_URL}/pokemon`);
  
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
    