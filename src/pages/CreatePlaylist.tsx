import { useState } from 'react';
import { Song, songs } from '../data/songs';
import './CreatePlaylist.css';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);

  const handleAddSong = (song: Song) => {
    if (!selectedSongs.find(s => s.id === song.id)) {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const handleRemoveSong = (songId: number) => {
    setSelectedSongs(selectedSongs.filter(song => song.id !== songId));
  };

  const handleSavePlaylist = () => {
    if (!playlistName.trim() || selectedSongs.length === 0) return;

    const playlist = {
      id: Date.now(),
      name: playlistName,
      description: `Playlist creada por el usuario`,
      cover: selectedSongs[0].cover,
      songs: selectedSongs.map(song => song.id)
    };

    // Guardar en localStorage
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    localStorage.setItem('playlists', JSON.stringify([...playlists, playlist]));

    // Limpiar el formulario
    setPlaylistName('');
    setSelectedSongs([]);
  };

  return (
    <div className="create-playlist-page">
      <header className="create-playlist-header">
        <h1>Crear Playlist</h1>
        <div className="playlist-form">
          <input
            type="text"
            placeholder="Nombre de la playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="playlist-name-input"
          />
          <button 
            className="save-playlist-button"
            onClick={handleSavePlaylist}
            disabled={!playlistName.trim() || selectedSongs.length === 0}
          >
            Guardar Playlist
          </button>
        </div>
      </header>

      <div className="playlist-content">
        <section className="selected-songs">
          <h2>Canciones seleccionadas ({selectedSongs.length})</h2>
          <div className="selected-songs-list">
            {selectedSongs.map((song) => (
              <div 
                key={song.id} 
                className="selected-song-item"
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
              >
                <img src={song.cover} alt={song.title} className="song-cover" />
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                {hoveredSong === song.id && (
                  <button 
                    className="remove-song-button"
                    onClick={() => handleRemoveSong(song.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="available-songs">
          <h2>Agregar canciones</h2>
          <div className="songs-grid">
            {songs.map((song) => (
              <div 
                key={song.id}
                className="song-card"
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
              >
                <div className="song-cover-container">
                  <img src={song.cover} alt={song.title} />
                  {hoveredSong === song.id && (
                    <button 
                      className="add-song-button"
                      onClick={() => handleAddSong(song)}
                    >
                      +
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
    </div>
  );
};

export default CreatePlaylist; 