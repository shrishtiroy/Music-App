import "../css/MusicCard.css";
import { useMusicContext } from "../contexts/MusicContext";
import { Link } from "react-router-dom";


function MusicCard({music}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMusicContext()
    const favorite = isFavorite(music.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(music.id)
        else addToFavorites(music)
    }

    return <div className = "music-card">
        <div className="music-poster">
            <img src = {music.images[0].url}/>
            <div className="music-overlay">
                <button className = {`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ☆
                </button>
            </div>
        </div>
        <div className="music-info">
            <h3>{music.name}</h3>
            
            <p>{music.release_date?.split("-")[0]}</p>
            <Link to={music.external_urls.spotify} target="_blank">Listen Here</Link>
        </div>
    </div>
}

export default MusicCard