import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/pokeService';
import type { PokemonDetail } from '../types/types';

interface PokemonVersusProps {
    pokemon1Name: string;
    pokemon2Name: string;
    onBack: () => void;
}

function PokemonVersus({ pokemon1Name, pokemon2Name, onBack }: PokemonVersusProps) {
    const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
    const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoth = async () => {
            try {
                const [p1, p2] = await Promise.all([
                    getPokemonDetail(pokemon1Name),
                    getPokemonDetail(pokemon2Name)
                ]);
                setPokemon1(p1);
                setPokemon2(p2);
            } finally {
                setLoading(false);
            }
        };

        fetchBoth();
    }, [pokemon1Name, pokemon2Name]);

    if (loading) return <p>Cargando comparación...</p>;
    if (!pokemon1 || !pokemon2) return null;

    const getImageUrl = (pokemon: PokemonDetail) =>
        pokemon.sprites.other['official-artwork'].front_default || 
        pokemon.sprites.front_default || '';

    return (
        <div className="versus-view">
            <button className="btn-back" onClick={onBack}>← Volver</button>

            <h1>Versus</h1>

            <div className="versus-grid">
                
                <div className="versus-pokemon">
                    <img src={getImageUrl(pokemon1)} alt={pokemon1.name} />
                    <h2>{pokemon1.name}</h2>
                    <p className="pokemon-id">#{String(pokemon1.id).padStart(3, '0')}</p>

                    <div className="info-block">
                        <h3>Tipos</h3>
                        <div className="types-list">
                            {pokemon1.types.map(t => (
                                <span key={t.type.name} className="type-badge">{t.type.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="info-block">
                        <h3>Info</h3>
                        <p>Altura: {pokemon1.height / 10}m</p>
                        <p>Peso: {pokemon1.weight / 10}kg</p>
                    </div>

                    <div className="info-block">
                        <h3>Habilidades</h3>
                        <ul>
                            {pokemon1.abilities.map(a => (
                                <li key={a.ability.name}>{a.ability.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-block">
                        <h3>Estadísticas</h3>
                        {pokemon1.stats.map(s => (
                            <div key={s.stat.name} className="stat-item">
                                <span className="stat-label">{s.stat.name}</span>
                                <span className="stat-number">{s.base_stat}</span>
                                <div className="stat-bar">
                                    <div 
                                        className="stat-fill" 
                                        style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               
                <div className="versus-divider">
                    <span>VS</span>
                </div>

                
                <div className="versus-pokemon">
                    <img src={getImageUrl(pokemon2)} alt={pokemon2.name} />
                    <h2>{pokemon2.name}</h2>
                    <p className="pokemon-id">#{String(pokemon2.id).padStart(3, '0')}</p>

                    <div className="info-block">
                        <h3>Tipos</h3>
                        <div className="types-list">
                            {pokemon2.types.map(t => (
                                <span key={t.type.name} className="type-badge">{t.type.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="info-block">
                        <h3>Info</h3>
                        <p>Altura: {pokemon2.height / 10}m</p>
                        <p>Peso: {pokemon2.weight / 10}kg</p>
                    </div>

                    <div className="info-block">
                        <h3>Habilidades</h3>
                        <ul>
                            {pokemon2.abilities.map(a => (
                                <li key={a.ability.name}>{a.ability.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-block">
                        <h3>Estadísticas</h3>
                        {pokemon2.stats.map(s => (
                            <div key={s.stat.name} className="stat-item">
                                <span className="stat-label">{s.stat.name}</span>
                                <span className="stat-number">{s.base_stat}</span>
                                <div className="stat-bar">
                                    <div 
                                        className="stat-fill" 
                                        style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonVersus;
