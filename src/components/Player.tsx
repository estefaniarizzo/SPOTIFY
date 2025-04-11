import { 
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  Shuffle,
  Repeat,
  FavoriteBorder,
  Favorite,
  RepeatOne,
  VolumeOff
} from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import { Song } from '../data/songs';
import './Player.css';


interface PlayerProps {
  currentSong?: Song;
  queue: Song[];
  queueIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Player = ({ currentSong, queue, queueIndex, onNext, onPrevious }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!currentSong) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => {
            console.error('Error al reproducir:', error);
            setError('Error al reproducir la canción');
            setIsPlaying(false);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    setError(null);
    onPrevious();
  };

  const handleNext = () => {
    setError(null);
    onNext();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setError(null);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = previousVolume;
        setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        audioRef.current.volume = 0;
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  const handleRepeatClick = () => {
    switch (repeatMode) {
      case 'none':
        setRepeatMode('all');
        break;
      case 'all':
        setRepeatMode('one');
        break;
      case 'one':
        setRepeatMode('none');
        break;
    }
  };

  const handleEnded = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .catch(error => {
            console.error('Error al repetir:', error);
            setError('Error al repetir la canción');
            setIsPlaying(false);
          });
      }
    } else if (repeatMode === 'all' || isShuffle) {
      handleNext();
    } else if (queueIndex < queue.length - 1) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  const handleError = () => {
    setError('Error al cargar el archivo de audio');
    setIsPlaying(false);
  };

  const handleFavoriteClick = () => {
    if (!currentSong) return;

    const favorites = localStorage.getItem('favorites');
    const favList = favorites ? JSON.parse(favorites) : [];
    
    if (!isFavorite) {
      const newFavList = [...favList, currentSong.id];
      localStorage.setItem('favorites', JSON.stringify(newFavList));
    } else {
      const newFavList = favList.filter((id: number) => id !== currentSong.id);
      localStorage.setItem('favorites', JSON.stringify(newFavList));
    }
    
    setIsFavorite(!isFavorite);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Reiniciar estados
      setError(null);
      setCurrentTime(0);
      setDuration(0);
      
      // Actualizar fuente de audio
      audioRef.current.src = currentSong.audioUrl;
      
      // Intentar reproducir
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => {
            console.error('Error al reproducir:', error);
            setError('Error al cargar la canción');
            setIsPlaying(false);
          });
      }

      // Verificar favoritos
      const favorites = localStorage.getItem('favorites');
      const favList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favList.includes(currentSong.id));
    }
  }, [currentSong]);

  return (
    <div className="player">
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="now-playing">
        {currentSong ? (
          <>
            <img 
              src={currentSong.cover}
              alt={currentSong.title}
              className="album-cover" 
            />
            <div className="track-info">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <>
            <div className="album-cover placeholder" />
            <div className="track-info">
              <h4>No hay canción reproduciendo</h4>
              <p>---</p>
            </div>
          </>
        )}
        <button 
          className="like-button" 
          onClick={handleFavoriteClick}
          disabled={!currentSong}
        >
          {isFavorite ? <Favorite style={{ color: '#1DB954' }} /> : <FavoriteBorder />}
        </button>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button 
            className={`control-button ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            disabled={!currentSong}
          >
            <Shuffle />
          </button>
          <button 
            className="control-button" 
            onClick={handlePrevious}
            disabled={!currentSong}
          >
            <SkipPrevious />
          </button>
          <button 
            className="control-button play-pause" 
            onClick={handlePlayPause}
            disabled={!currentSong}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </button>
          <button 
            className="control-button" 
            onClick={handleNext}
            disabled={!currentSong}
          >
            <SkipNext />
          </button>
          <button 
            className={`control-button ${repeatMode !== 'none' ? 'active' : ''}`}
            onClick={handleRepeatClick}
            disabled={!currentSong}
          >
            {repeatMode === 'one' ? <RepeatOne /> : <Repeat />}
          </button>
        </div>
        
        <div className="progress-bar">
          <span className="time">{formatTime(currentTime)}</span>
          <div className="progress-container">
            <div 
              className="progress"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="volume-controls">
        <button className="volume-button" onClick={toggleMute}>
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Player; 