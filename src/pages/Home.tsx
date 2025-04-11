import { useState } from 'react';
import { Song, songs } from '../data/songs';
import './Home.css';

interface HomeProps {
  onPlaySong: (songId: number) => void;
  onPlayQueue: (songs: Song[]) => void;
}

const Home = ({ onPlaySong }: HomeProps) => {
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null);

  return (
    <div className="home">
      <header className="home-header">
        <h1>¡Buenas tardes!</h1>
      </header>

      <section className="featured-section">
        <h2>Rock Clásico</h2>
        <div className="album-grid">
          {songs.map((song) => (
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
      </section>
    </div>
  );
};

export default Home; 