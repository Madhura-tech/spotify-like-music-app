import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './musicSlice';
import playerReducer from './playerSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    player: playerReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['player/setAudioRef'],
        ignoredPaths: ['player.audioRef'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;