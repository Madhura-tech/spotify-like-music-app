import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { musicAPI } from '../services/musicAPI';

// Async thunks
export const fetchSongs = createAsyncThunk(
  'music/fetchSongs',
  async (genre = 'All', { rejectWithValue }) => {
    try {
      const response = await musicAPI.getSongs(genre);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSongById = createAsyncThunk(
  'music/fetchSongById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await musicAPI.getSongById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  'music/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const response = await musicAPI.getGenres();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTopSongs = createAsyncThunk(
  'music/fetchTopSongs',
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await musicAPI.getTopSongs(limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchSongs = createAsyncThunk(
  'music/searchSongs',
  async (query, { rejectWithValue }) => {
    try {
      const response = await musicAPI.searchSongs(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  songs: [],
  topSongs: [],
  genres: [],
  currentSong: null,
  selectedGenre: 'All',
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null,
  topSongsLoading: false,
  genresLoading: false,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch songs
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload.songs;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch song by ID
      .addCase(fetchSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSong = action.payload;
      })
      .addCase(fetchSongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.genresLoading = true;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genresLoading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genresLoading = false;
        state.error = action.payload;
      })
      // Fetch top songs
      .addCase(fetchTopSongs.pending, (state) => {
        state.topSongsLoading = true;
      })
      .addCase(fetchTopSongs.fulfilled, (state, action) => {
        state.topSongsLoading = false;
        state.topSongs = action.payload;
      })
      .addCase(fetchTopSongs.rejected, (state, action) => {
        state.topSongsLoading = false;
        state.error = action.payload;
      })
      // Search songs
      .addCase(searchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedGenre, setSearchQuery, clearError, clearSearchResults } = musicSlice.actions;
export default musicSlice.reducer;