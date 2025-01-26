import "../css/Favorites.css"
import { useMusicContext } from "../contexts/MusicContext";
import MusicCard from "../components/MusicCard";

function Favorites() {
    const {favorites} = useMusicContext();

    if(favorites.length>0){
        return <div className = "favorites"> 
                <h2>Your Favorites</h2>
                <div className = "musics-grid">
                    {favorites.map((music) => (
                        <MusicCard music={music} key={music.id}/>
                    ))}
                </div>
            </div>
    }

    return <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>add albums to your favorites</p>
    </div>
}

export default Favorites