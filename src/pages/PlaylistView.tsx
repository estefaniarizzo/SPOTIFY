import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayArrow, Pause, AccessTime } from '@mui/icons-material';
import { Song, getAllPlaylists, songs } from '../data/songs';
import './PlaylistView.css';

interface Playlist {
  id: number;
  name: string;
  description: string;
  cover: string;
  songs: number[];
}

interface PlaylistViewProps {
  onPlaySong: (songId: number) => void;
  currentSong?: Song;
  isPlaying: boolean;
}

const PlaylistView = ({ onPlaySong, currentSong, isPlaying }: PlaylistViewProps) => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);

  useEffect(() => {
    const playlists = getAllPlaylists();
    const foundPlaylist = playlists.find(p => p.id === Number(id));
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
    }
  }, [id]);

  if (!playlist) {
    return <div className="playlist-view">Cargando...</div>;
  }

  const handlePlaySong = (songId: number) => {
    onPlaySong(songId);
  };

  return (
    <div className="playlist-view">
      <header className="playlist-header">
        <img src={playlist.cover} alt={playlist.name} className="playlist-cover" />
        <div className="playlist-info">
          <span className="playlist-type">Playlist</span>
          <h1>{playlist.name}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-meta">
            <span>{playlist.songs.length} canciones</span>
          </div>
        </div>
      </header>

      <div className="playlist-content">
        <div className="songs-header">
          <div className="song-number">#</div>
          <div className="song-info">Título</div>
          <div className="song-album">Álbum</div>
          <div className="song-duration">
            <AccessTime />
          </div>
        </div>

        <div className="songs-list">
          {playlist.songs.map((songId: number, index: number) => {
            const song = songs.find((s: Song) => s.id === songId);
            if (!song) return null;

            const isCurrentSong = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                className={`song-row ${isCurrentSong ? 'playing' : ''}`}
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
                onClick={() => handlePlaySong(song.id)}
              >
                <div className="song-number">
                  {hoveredSong === song.id ? (
                    <button className="play-button">
                      {isCurrentSong && isPlaying ? <Pause /> : <PlayArrow />}
                    </button>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="song-info">
                  <img src={song.cover} alt={song.title} />
                  <div>
                    <span className="song-title">{song.title}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                </div>
                <div className="song-album">{song.album}</div>
                <div className="song-duration">3:30</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView; 