import aerosmithCover from '../assets/images/aerosmith.jpeg';
import bonjoviCover from '../assets/images/bon jovi.jpg';
import nickelbackCover from '../assets/images/nickelback.jpg';
import smashMouthCover from '../assets/images/smashmouth.jpeg';
  
// Importar todos los archivos de audio
import aerosmithIDWTMAT from '../assets/audio/Aerosmith - I Don\'t Want to Miss a Thing.mp3';
import aerosmithAmazing from '../assets/audio/Aerosmith - Amazing.mp3';
import aerosmithCrazy from '../assets/audio/Aerosmith - Crazy.mp3';
import aerosmithDreamOn from '../assets/audio/Aerosmith - Dream On.mp3';

import bonjoviIML from '../assets/audio/Bon Jovi - It\'s My Life.mp3';
import bonjoviAlways from '../assets/audio/Bon Jovi - Always.mp3';
import bonjoviLOAP from '../assets/audio/Bon Jovi - Livin\' On A Prayer.mp3';
import bonjoviYGLABN from '../assets/audio/Bon Jovi - You Give Love A Bad Name.mp3';

import nickelbackHYRM from '../assets/audio/Nickelback - How You Remind Me.mp3';
import nickelbackFarAway from '../assets/audio/Nickelback - Far Away.mp3';
import nickelbackPhotograph from '../assets/audio/Nickelback - Photograph.mp3';
import nickelbackRockstar from '../assets/audio/Nickelback - Rockstar.mp3';

import smashMouthAllStar from '../assets/audio/Smash Mouth - All Star.mp3';
import smashMouthBeliever from '../assets/audio/Smash Mouth - I\'m A Believer.mp3';
import smashMouthMorning from '../assets/audio/Smash Mouth - Then The Morning Comes.mp3';
import smashMouthWalkin from '../assets/audio/Smash Mouth - Walkin\' On The Sun.mp3';

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

export const songs: Song[] = [
  // Aerosmith
  {
    id: 1,
    title: "I Don't Want to Miss a Thing",
    artist: "Aerosmith",
    album: "Armageddon: The Album",
    duration: "4:58",
    cover: aerosmithCover,
    audioUrl: aerosmithIDWTMAT
  },
  {
    id: 2,
    title: "Amazing",
    artist: "Aerosmith",
    album: "Get A Grip",
    duration: "5:57",
    cover: aerosmithCover,
    audioUrl: aerosmithAmazing
  },
  {
    id: 3,
    title: "Crazy",
    artist: "Aerosmith",
    album: "Get A Grip",
    duration: "5:14",
    cover: aerosmithCover,
    audioUrl: aerosmithCrazy
  },
  {
    id: 4,
    title: "Dream On",
    artist: "Aerosmith",
    album: "Aerosmith",
    duration: "4:28",
    cover: aerosmithCover,
    audioUrl: aerosmithDreamOn
  },

  // Bon Jovi
  {
    id: 5,
    title: "It's My Life",
    artist: "Bon Jovi",
    album: "Crush",
    duration: "3:44",
    cover: bonjoviCover,
    audioUrl: bonjoviIML
  },
  {
    id: 6,
    title: "Always",
    artist: "Bon Jovi",
    album: "Cross Road",
    duration: "5:53",
    cover: bonjoviCover,
    audioUrl: bonjoviAlways
  },
  {
    id: 7,
    title: "Livin' On A Prayer",
    artist: "Bon Jovi",
    album: "Slippery When Wet",
    duration: "4:11",
    cover: bonjoviCover,
    audioUrl: bonjoviLOAP
  },
  {
    id: 8,
    title: "You Give Love A Bad Name",
    artist: "Bon Jovi",
    album: "Slippery When Wet",
    duration: "3:42",
    cover: bonjoviCover,
    audioUrl: bonjoviYGLABN
  },

  // Nickelback
  {
    id: 9,
    title: "How You Remind Me",
    artist: "Nickelback",
    album: "Silver Side Up",
    duration: "3:43",
    cover: nickelbackCover,
    audioUrl: nickelbackHYRM
  },
  {
    id: 10,
    title: "Far Away",
    artist: "Nickelback",
    album: "All the Right Reasons",
    duration: "3:58",
    cover: nickelbackCover,
    audioUrl: nickelbackFarAway
  },
  {
    id: 11,
    title: "Photograph",
    artist: "Nickelback",
    album: "All the Right Reasons",
    duration: "4:19",
    cover: nickelbackCover,
    audioUrl: nickelbackPhotograph
  },
  {
    id: 12,
    title: "Rockstar",
    artist: "Nickelback",
    album: "All the Right Reasons",
    duration: "4:15",
    cover: nickelbackCover,
    audioUrl: nickelbackRockstar
  },

  // Smash Mouth
  {
    id: 13,
    title: "All Star",
    artist: "Smash Mouth",
    album: "Astro Lounge",
    duration: "3:21",
    cover: smashMouthCover,
    audioUrl: smashMouthAllStar
  },
  {
    id: 14,
    title: "I'm A Believer",
    artist: "Smash Mouth",
    album: "Shrek Soundtrack",
    duration: "3:03",
    cover: smashMouthCover,
    audioUrl: smashMouthBeliever
  },
  {
    id: 15,
    title: "Then The Morning Comes",
    artist: "Smash Mouth",
    album: "Astro Lounge",
    duration: "3:11",
    cover: smashMouthCover,
    audioUrl: smashMouthMorning
  },
  {
    id: 16,
    title: "Walkin' On The Sun",
    artist: "Smash Mouth",
    album: "Fush Yu Mang",
    duration: "3:27",
    cover: smashMouthCover,
    audioUrl: smashMouthWalkin
  }
];

// Playlists temáticas predefinidas
const defaultPlaylists = [
  {
    id: 1,
    name: "Power Ballads",
    description: "Las mejores baladas del rock",
    cover: aerosmithCover,
    songs: [1, 2, 3, 6, 10] // IDWTMAT, Amazing, Crazy, Always, Far Away
  },
  {
    id: 2,
    name: "Rock Clásico",
    description: "Himnos del rock que nunca pasan de moda",
    cover: bonjoviCover,
    songs: [4, 7, 8, 9] // Dream On, LOAP, YGLABN, HYRM
  },
  {
    id: 3,
    name: "Éxitos 2000s",
    description: "Los mejores hits de los 2000",
    cover: nickelbackCover,
    songs: [5, 11, 12] // It's My Life, Photograph, Rockstar
  },
  {
    id: 4,
    name: "Feel Good Rock",
    description: "Canciones para animarte",
    cover: smashMouthCover,
    songs: [13, 14, 15, 16] // Todas las de Smash Mouth
  }
];

// Función para obtener todas las playlists (predefinidas + usuario)
export const getAllPlaylists = () => {
  const userPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
  return [...defaultPlaylists, ...userPlaylists];
};

// Exportar las playlists como una función para que siempre estén actualizadas
export const playlists = getAllPlaylists();

// Función para obtener una canción por ID
export const getSongById = (id: number): Song | undefined => {
  return songs.find(song => song.id === id);
};

// Función para obtener una playlist por ID
export const getPlaylistById = (id: number) => {
  return getAllPlaylists().find(playlist => playlist.id === id);
}; 