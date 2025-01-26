import './css/App.css';
import MusicCard from './components/MusicCard';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import {Routes, Route} from "react-router-dom";
import { MusicProvider } from './contexts/MusicContext';
import NavBar from './components/NavBar';

function App() {
  return (

    <MusicProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MusicProvider>
      
  );
}


export default App
