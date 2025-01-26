import {createContext, useState, useContext, useEffect} from "react"

const MusicContext = createContext()

export const useMusicContext = () => useContext(MusicContext)

export const MusicProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])
        
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (music) => {
        setFavorites(prev => [...prev, music])
    }

    const removeFromFavorites = (musicId) => {
        setFavorites(prev => prev.filter(music => music.id !== musicId))
    }

    const isFavorite = (musicId) => {
        return favorites.some(music => music.id === musicId)
    }

    const value = {
        favorites,
        removeFromFavorites, 
        addToFavorites,
        isFavorite
    }

    return <MusicContext.Provider value = {value}>
        {children}
    </MusicContext.Provider>
}