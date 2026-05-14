import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/pokeService';
import type { PokemonDetail } from '../types/types';

interface PokemonDetailViewProps {
    name: string;
    onBack: () => void;
}

export default function PokemonDetailView({ name, onBack }: PokemonDetailViewProps) {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        setLoading(true);
        getPokemonDetail(name)
            .then(setPokemon)
            .catch(err => setError((err as Error).message))
            .finally(() => setLoading(false));
    }, [name]);

    if (loading) return <p>Cargando detalle...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!pokemon) return null;

   
    const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default 
                  || pokemon.sprites.front_default 
                  || '';

    return (
        <article className="pokemon-card">
            <button className="btn-back" onClick={onBack}>← Volver</button>

            <header className="pokemon-card__header">
                <img src={imageUrl} alt={pokemon.name} className="pokemon-image" />
                <h2>
                    {pokemon.name} <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
                </h2>
            </header>

            <div className="pokemon-card__types">
                {pokemon.types.map(({ type }) => (
                    <span key={type.name} className="badge">{type.name}</span>
                ))}
            </div>

            <div className="pokemon-card__info">
                <p>
                    <strong>Altura:</strong> {pokemon.height / 10} m &nbsp;|&nbsp; 
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                </p>
                <p>
                    <strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
                </p>
            </div>

            <section className="pokemon-stats">
                <h3>Estadísticas Base</h3>
                <div className="stats-grid">
                    {pokemon.stats.map(({ stat, base_stat }) => (
                        <div key={stat.name} className="stat-row">
                            <span className="stat-name">{stat.name}</span>
                          
                            <progress className="stat-bar" max="255" value={base_stat} />
                            <strong className="stat-value">{base_stat}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </article>
    );
}