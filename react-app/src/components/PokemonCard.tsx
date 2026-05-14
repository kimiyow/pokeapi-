import type { Pokemon } from '../types/types';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: (name: string) => void;
}

function getIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1]);
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    const id = getIdFromUrl(pokemon.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="pokemon-card" onClick={() => onClick(pokemon.name)}>
            <img
                src={imageUrl}
                alt={pokemon.name}
                className="pokemon-card__image"
                loading="lazy"
            />
            <span className="pokemon-card__id">#{String(id).padStart(3, '0')}</span>
            <h3 className="pokemon-card__name">{pokemon.name}</h3>
        </div>
    );
}

export default PokemonCard;
