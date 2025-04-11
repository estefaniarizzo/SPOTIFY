import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Favorites from './pages/Favorites';
import CreatePlaylist from './pages/CreatePlaylist';
import { Song, songs } from './data/songs';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954', // Color verde de Spotify
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
  },
});

function App() {
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
  const [queue, setQueue] = useState<Song[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const handlePlaySong = (songId: number) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      setCurrentSong(song);
      setQueue([song]);
      setQueueIndex(0);
    }
  };

  const handlePlayQueue = (songsToPlay: Song[]) => {
    if (songsToPlay.length > 0) {
      setQueue(songsToPlay);
      setCurrentSong(songsToPlay[0]);
      setQueueIndex(0);
    }
  };

  const handleNext = () => {
    if (queue.length > queueIndex + 1) {
      setQueueIndex(queueIndex + 1);
      setCurrentSong(queue[queueIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (queueIndex > 0) {
      setQueueIndex(queueIndex - 1);
      setCurrentSong(queue[queueIndex - 1]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    onPlaySong={handlePlaySong}
                    onPlayQueue={handlePlayQueue}
                  />
                } 
              />
              <Route 
                path="/search" 
                element={<Search onPlayQueue={handlePlayQueue} />} 
              />
              <Route 
                path="/library" 
                element={<Library onPlayQueue={handlePlayQueue} />} 
              />
              <Route 
                path="/favorites" 
                element={<Favorites onPlaySong={handlePlaySong} />} 
              />
              <Route 
                path="/create-playlist" 
                element={<CreatePlaylist />} 
              />
            </Routes>
          </main>
          <Player 
            currentSong={currentSong}
            queue={queue}
            queueIndex={queueIndex}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
