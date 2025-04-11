import { useState } from 'react';
import { songs } from '../data/songs';
import './Favorites.css';

interface FavoritesProps {
  onPlaySong: (songId: number) => void;
}

const Favorites = ({ onPlaySong }: FavoritesProps) => {
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const favoriteSongs = songs.filter(song => favorites.includes(song.id));

  return (
    <div className="favorites">
      <header className="favorites-header">
        <h1>Tus Me Gusta</h1>
        <p>{favoriteSongs.length} canciones</p>
      </header>

      <div className="favorites-grid">
        {favoriteSongs.map((song) => (
          <div 
            key={song.id}
            className="album-card"
            onMouseEnter={() => setHoveredAlbum(song.id)}
            onMouseLeave={() => setHoveredAlbum(null)}
          >
            <div className="album-cover-container">
              <img src={song.cover} alt={song.title} />
              {hoveredAlbum === song.id && (
                <button className="play-button" onClick={() => onPlaySong(song.id)}>
                  <span>▶</span>
                </button>
              )}
            </div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>

      {favoriteSongs.length === 0 && (
        <div className="empty-favorites">
          <h2>Aún no tienes canciones favoritas</h2>
          <p>Haz clic en el corazón de cualquier canción para agregarla a tus favoritos</p>
        </div>
      )}
    </div>
  );
};

export default Favorites; 