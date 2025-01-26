import MusicCard from "../components/MusicCard"
import {useState, useEffect} from "react"
import { searchMusics, getPopularMusics } from "../services/api";
import "../css/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const[accessToken, setAccessToken] = useState("");
    const[displayContext, setDisplayContext] = useState("Latest Releases");
    const CLIENT_ID = "ed4966e2fd0d4a39815c88a3f1859368";
    const CLIENT_SECRET = "f3d8cae916e245ebade30f837131aa7d";
    
    
    const fetchAccessToken = async () => {
        try {
            const authParameters = {
                method: 'POST', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            };

            const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
            const data = await response.json();
            if (data.access_token) {
                setAccessToken(data.access_token);
                const expirationTime = Date.now() + (data.expires_in * 1000);
                localStorage.setItem('tokenExpiration', expirationTime);
            }
        } catch (error) {
            console.error("Token fetch error:", error);
            setError("Failed to obtain access token");
        }
    };
    

    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if (!accessToken || !tokenExpiration || Date.now() >= tokenExpiration) {
        fetchAccessToken();
    }

    
    useEffect(() => {
        if (accessToken) {
            const loadPopularMusics = async () => {
                try {
                    const popularMusics = await getPopularMusics(accessToken);
                    setAlbums(popularMusics);
                    setDisplayContext("Latest Releases");
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load albums");
                    setLoading(false);
                }
            };
    
            loadPopularMusics();
        }
    }, [accessToken]);
    
    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMusics(searchQuery, accessToken)
            setAlbums(searchResults)
            setDisplayContext("Searching for: " + searchQuery + "'s albums");
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search albums...")
        }finally{
            setLoading(false)
        }

        setSearchQuery("")
    };

    return (
    <div className="home">
        
        <form onSubmit={handleSearch} className = "search-form">
            <input 
                type = "text" 
                placeholder="search for artists..." 
                className="search-input"
                value = {searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type ="submit" className="search-button">Search</button>
        </form>
        <h2>{displayContext}</h2>
        {error && <div className="error-message">{error}</div>}
    {loading ? (
        <div className="loading">Loading...</div>): (
            <div className = "musics-grid">
            {albums.map((album) => (
                <MusicCard music={album} key={album.id}/>
            ))}
            </div>
    )}    
    </div>);
}

export default Home