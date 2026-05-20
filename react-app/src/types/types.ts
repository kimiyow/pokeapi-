export interface Pokemon {
    name: string;
    url: string;
    isFavorite?: boolean;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    other: {
        'official-artwork': {
            front_default: string | null;
        };
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}
