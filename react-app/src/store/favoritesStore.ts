import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
    favorites: string[];
    toggleFavorite: (name: string) => void;
    isFavorite: (name: string) => boolean;
    addFavorite: (name: string) => void;
    removeFavorite: (name: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            
            toggleFavorite: (name: string) => {
                set((state) => ({
                    favorites: state.favorites.includes(name)
                        ? state.favorites.filter(fav => fav !== name)
                        : [...state.favorites, name]
                }))
            },
            
            addFavorite: (name: string) => {
                set((state) => ({
                    favorites: state.favorites.includes(name) 
                        ? state.favorites 
                        : [...state.favorites, name]
                }))
            },
            
            removeFavorite: (name: string) => {
                set((state) => ({
                    favorites: state.favorites.filter(fav => fav !== name)
                }))
            },
            
            isFavorite: (name: string) => {
                return get().favorites.includes(name);
            }
        }),
        {
            name: 'pokemon-favorites-storage'
        }
    )
);
