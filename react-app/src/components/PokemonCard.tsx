import type { Pokemon } from '../types/types';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: (name: string) => void;
    isFavorite: boolean;  
    onToggleFavorite: (name: string) => void;  
}

function getIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1]);
}

function PokemonCard({ pokemon, onClick, isFavorite, onToggleFavorite }: PokemonCardProps) {
    
    const id = getIdFromUrl(pokemon.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div className="pokemon-card">
            <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pokemon.name);
                }}
            >
                {isFavorite ? '★' : '☆'}
            </button>
            
            <div onClick={() => onClick(pokemon.name)} className="pokemon-card__content">
                <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="pokemon-card__image"
                    loading="lazy"
                />
                <span className="pokemon-card__id">#{String(id).padStart(3, '0')}</span>
                <h3 className="pokemon-card__name">{pokemon.name}</h3>
            </div>
        </div>
    );
}

export default PokemonCard;