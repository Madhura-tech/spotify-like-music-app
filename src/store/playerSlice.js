import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isShuffled: false,
  isRepeated: false,
  playlist: [],
  currentIndex: 0,
  audioRef: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setIsMuted: (state, action) => {
      state.isMuted = action.payload;
    },
    setIsShuffled: (state, action) => {
      state.isShuffled = action.payload;
    },
    setIsRepeated: (state, action) => {
      state.isRepeated = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setAudioRef: (state, action) => {
      state.audioRef = action.payload;
    },
    playNext: (state) => {
      if (state.playlist.length > 0) {
        if (state.isShuffled) {
          state.currentIndex = Math.floor(Math.random() * state.playlist.length);
        } else {
          state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
        }
        state.currentSong = state.playlist[state.currentIndex];
      }
    },
    playPrevious: (state) => {
      if (state.playlist.length > 0) {
        if (state.isShuffled) {
          state.currentIndex = Math.floor(Math.random() * state.playlist.length);
        } else {
          state.currentIndex = state.currentIndex === 0 
            ? state.playlist.length - 1 
            : state.currentIndex - 1;
        }
        state.currentSong = state.playlist[state.currentIndex];
      }
    },
    playSong: (state, action) => {
      const { song, playlist = [] } = action.payload;
      state.currentSong = song;
      state.playlist = playlist;
      state.currentIndex = playlist.findIndex(s => s.id === song.id);
      state.isPlaying = true;
    },
  },
});

export const {
  setCurrentSong,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setIsMuted,
  setIsShuffled,
  setIsRepeated,
  setPlaylist,
  setCurrentIndex,
  setAudioRef,
  playNext,
  playPrevious,
  playSong,
} = playerSlice.actions;

export default playerSlice.reducer;