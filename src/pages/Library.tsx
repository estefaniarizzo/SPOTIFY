import { useState, useMemo, useEffect } from 'react';
import { Song, songs, getAllPlaylists } from '../data/songs';
import './Library.css';

interface Album {
  title: string;
  artist: string;
  cover: string;
  songs: Song[];
}

interface LibraryProps {
  onPlayQueue: (songs: Song[]) => void;
}

const Library = ({ onPlayQueue }: LibraryProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'playlists' | 'albums'>('all');
  const [userPlaylists, setUserPlaylists] = useState(getAllPlaylists());

  // Actualizar playlists cuando cambien en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserPlaylists(getAllPlaylists());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Agrupar canciones por álbum
  const albums = useMemo(() => {
    const albumMap = new Map<string, Album>();
    
    songs.forEach(song => {
      const key = `${song.album}-${song.artist}`;
      if (!albumMap.has(key)) {
        albumMap.set(key, {
          title: song.album,
          artist: song.artist,
          cover: song.cover,
          songs: []
        });
      }
      albumMap.get(key)?.songs.push(song);
    });

    return Array.from(albumMap.values());
  }, []);

  // Agrupar álbumes por artista
  const albumsByArtist = useMemo(() => {
    const artistMap = new Map<string, Album[]>();
    
    albums.forEach(album => {
      if (!artistMap.has(album.artist)) {
        artistMap.set(album.artist, []);
      }
      artistMap.get(album.artist)?.push(album);
    });

    return artistMap;
  }, [albums]);

  const handlePlayAlbum = (albumSongs: Song[]) => {
    onPlayQueue(albumSongs);
  };

  const handlePlayPlaylist = (playlistSongs: number[]) => {
    const songsToPlay = playlistSongs
      .map(id => songs.find(s => s.id === id))
      .filter((song): song is Song => song !== undefined);
    onPlayQueue(songsToPlay);
  };

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>Tu Biblioteca</h1>
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todo
          </button>
          <button 
            className={`filter-button ${filter === 'playlists' ? 'active' : ''}`}
            onClick={() => setFilter('playlists')}
          >
            Playlists
          </button>
          <button 
            className={`filter-button ${filter === 'albums' ? 'active' : ''}`}
            onClick={() => setFilter('albums')}
          >
            Álbumes
          </button>
        </div>
      </header>

      {(filter === 'all' || filter === 'playlists') && (
        <section className="library-section">
          <h2>Playlists</h2>
          <div className="library-grid">
            {userPlaylists.map((playlist) => (
              <div 
                key={`playlist-${playlist.id}`}
                className="library-card"
                onMouseEnter={() => setHoveredItem(`playlist-${playlist.id}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="library-cover">
                  <img src={playlist.cover} alt={playlist.name} />
                  {hoveredItem === `playlist-${playlist.id}` && (
                    <button 
                      className="play-button"
                      onClick={() => handlePlayPlaylist(playlist.songs)}
                    >
                      <span>▶</span>
                    </button>
                  )}
                </div>
                <div className="library-info">
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                  <span className="library-type">
                    Playlist • {playlist.songs.length} {playlist.songs.length === 1 ? 'canción' : 'canciones'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'albums') && (
        Array.from(albumsByArtist.entries()).map(([artist, artistAlbums]) => (
          <section key={artist} className="library-section">
            <h2>{artist}</h2>
            <div className="library-grid">
              {artistAlbums.map((album) => (
                <div 
                  key={`${album.title}-${album.artist}`}
                  className="library-card"
                  onMouseEnter={() => setHoveredItem(`${album.title}-${album.artist}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="library-cover">
                    <img src={album.cover} alt={album.title} />
                    {hoveredItem === `${album.title}-${album.artist}` && (
                      <button 
                        className="play-button"
                        onClick={() => handlePlayAlbum(album.songs)}
                      >
                        <span>▶</span>
                      </button>
                    )}
                  </div>
                  <div className="library-info">
                    <h3>{album.title}</h3>
                    <p>{album.artist}</p>
                    <span className="library-type">
                      Álbum • {album.songs.length} {album.songs.length === 1 ? 'canción' : 'canciones'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {((filter === 'playlists' && userPlaylists.length === 0) || 
        (filter === 'albums' && albums.length === 0) ||
        (filter === 'all' && userPlaylists.length === 0 && albums.length === 0)) && (
        <div className="empty-library">
          <h2>No hay {filter === 'all' ? 'elementos' : filter} en tu biblioteca</h2>
          <p>Los elementos que agregues aparecerán aquí</p>
        </div>
      )}
    </div>
  );
};

export default Library; 