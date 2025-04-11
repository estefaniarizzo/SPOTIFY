import { Link, useLocation } from 'react-router-dom';
import { Home, Search, LibraryMusic, Add, Favorite } from '@mui/icons-material';
import spotifyLogo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className="logo">
        <img src={spotifyLogo} alt="Spotify Logo" />
        <span>Spotify</span>
      </Link>

      <nav className="nav-menu">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Home />
          <span>Inicio</span>
        </Link>
        <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
          <Search />
          <span>Buscar</span>
        </Link>
        <Link to="/library" className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}>
          <LibraryMusic />
          <span>Tu Biblioteca</span>
        </Link>
        <Link to="/favorites" className={`nav-item ${location.pathname === '/favorites' ? 'active' : ''}`}>
          <Favorite />
          <span>Favoritos</span>
        </Link>
      </nav>

      <div className="playlist-section">
        <Link to="/create-playlist" className={`create-playlist-button ${location.pathname === '/create-playlist' ? 'active' : ''}`}>
          <div className="create-playlist-icon">
            <Add />
          </div>
          <span>Crear Playlist</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 