import { useState, useEffect } from 'react';
import { Song, songs, getAllPlaylists } from '../data/songs';
import './Search.css';

interface SearchProps {
  onPlayQueue: (songs: Song[]) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: 'album' | 'artist' | 'playlist';
  songs?: Song[];
}

const Search = ({ onPlayQueue }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [userPlaylists, setUserPlaylists] = useState(getAllPlaylists());

  // Actualizar playlists cuando cambien en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserPlaylists(getAllPlaylists());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Agrupar álbumes por artista
  const albums = songs.reduce((acc, song) => {
    const key = `${song.album}-${song.artist}`;
    if (!acc[key]) {
      acc[key] = {
        id: key,
        title: song.album,
        subtitle: song.artist,
        image: song.cover,
        type: 'album' as const,
        songs: []
      };
    }
    acc[key].songs?.push(song);
    return acc;
  }, {} as Record<string, SearchItem>);

  // Crear lista de artistas únicos
  const artists = Array.from(new Set(songs.map(song => song.artist))).map(artist => ({
    id: `artist-${artist}`,
    title: artist,
    subtitle: 'Artista',
    image: songs.find(s => s.artist === artist)?.cover || '',
    type: 'artist' as const
  }));

  // Crear lista de playlists
  const playlistItems = userPlaylists.map(playlist => {
    const playlistSongs = playlist.songs
      .map((id: number) => songs.find((song: Song) => song.id === id))
      .filter((song: unknown): song is Song => song !== undefined);
    
    return {
      id: `playlist-${playlist.id}`,
      title: playlist.name,
      subtitle: playlist.description || 'Usuario',
      image: playlist.cover,
      type: 'playlist' as const,
      songs: playlistSongs
    };
  });

  // Función de búsqueda
  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([
        ...Object.values(albums),
        ...artists,
        ...playlistItems
      ]);
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = [
        ...Object.values(albums).filter(album => 
          album.title.toLowerCase().includes(searchTerm) ||
          album.subtitle.toLowerCase().includes(searchTerm)
        ),
        ...artists.filter(artist => 
          artist.title.toLowerCase().includes(searchTerm)
        ),
        ...playlistItems.filter(playlist => 
          playlist.title.toLowerCase().includes(searchTerm)
        )
      ];
      setSearchResults(filtered);
    }
  }, [query]);

  const handlePlay = (item: SearchItem) => {
    if (item.type === 'album' || item.type === 'playlist') {
      if (item.songs) {
        onPlayQueue(item.songs);
      }
    } else if (item.type === 'artist') {
      const artistSongs = songs.filter(song => song.artist === item.title);
      onPlayQueue(artistSongs);
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="¿Qué quieres escuchar?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <section className="search-results">
        <h2>Explora</h2>
        <div className="results-grid">
          {searchResults.map((item) => (
            <div 
              key={item.id}
              className="result-card"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="result-cover-container">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="result-info">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
              {hoveredItem === item.id && (
                <button 
                  className="play-button"
                  onClick={() => handlePlay(item)}
                >
                  <span>▶</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search; 