# Spotify-like Music App - React & Redux Toolkit

A complete music streaming application with modern UI, Redux state management, and comprehensive features.

## 🎯 Features

### Core Functionality
- ✅ **Responsive UI**: Mobile-first design with Tailwind CSS
- ✅ **Redux Toolkit**: Global state management for music, player, and theme
- ✅ **API Integration**: Mock music API with error handling and loading states
- ✅ **Genre Filtering**: Browse music by different genres
- ✅ **Song Details**: Dedicated page for each song with full information
- ✅ **Music Player**: Full-featured playback controls with progress tracking
- ✅ **Search**: Real-time search with debouncing and popular categories
- ✅ **Theme Toggle**: Dark/light mode with localStorage persistence

### UI Components
- ✅ **SongCard**: Interactive cards with play buttons and hover effects
- ✅ **Sidebar**: Navigation with theme toggle and playlist sections
- ✅ **TopPlay**: Top charts and recently played songs
- ✅ **MusicPlayer**: Bottom player with full controls and progress bar

### Advanced Features
- ✅ **Audio Playback**: HTML5 audio with play/pause, seek, volume control
- ✅ **Playlist Management**: Next/previous, shuffle, repeat functionality
- ✅ **Loading States**: Skeleton loaders and smooth transitions
- ✅ **Error Handling**: Graceful error messages with retry options
- ✅ **Responsive Design**: Works perfectly on all device sizes

## 🚀 Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm start
```

3. **Open browser**: http://localhost:3000

## 📱 Pages & Components

### 1. Home Page
- **Genre Filter**: Browse music by categories
- **Song Grid**: Responsive grid of song cards
- **Made for You**: Personalized playlist recommendations
- **Loading States**: Skeleton loaders during data fetch

### 2. Search Page
- **Real-time Search**: Debounced search with instant results
- **Browse Categories**: Visual genre selection
- **Popular Searches**: Quick access to trending searches
- **Recent Searches**: Search history functionality

### 3. Song Details Page
- **Full Song Info**: Complete track information and metadata
- **Large Album Art**: High-resolution cover display
- **Action Buttons**: Play, like, share functionality
- **Lyrics Section**: Placeholder for future lyrics integration

### 4. Components
- **Sidebar**: Navigation with active states and theme toggle
- **TopPlay**: Top charts with play buttons and rankings
- **MusicPlayer**: Full-featured bottom player
- **SongCard**: Interactive song cards with animations

## 🎵 Music Player Features

### Playback Controls
- **Play/Pause**: Toggle playback state
- **Next/Previous**: Navigate through playlist
- **Shuffle**: Random song selection
- **Repeat**: Loop current song
- **Seek**: Click to jump to specific time
- **Volume**: Adjustable volume with mute option

### Visual Feedback
- **Progress Bar**: Real-time playback progress
- **Time Display**: Current time and total duration
- **Playing Indicator**: Animated equalizer bars
- **Album Art**: Current song artwork display

## 🔧 Redux Store Structure

### Music Slice
```javascript
{
  songs: [],           // All songs
  topSongs: [],        // Top charts
  genres: [],          // Available genres
  currentSong: null,   // Selected song details
  selectedGenre: 'All', // Current filter
  searchResults: [],   // Search results
  loading: false,      // Loading state
  error: null         // Error messages
}
```

### Player Slice
```javascript
{
  currentSong: null,   // Currently playing song
  isPlaying: false,    // Playback state
  currentTime: 0,      // Current playback time
  duration: 0,         // Song duration
  volume: 1,           // Volume level
  playlist: [],        // Current playlist
  isShuffled: false,   // Shuffle state
  isRepeated: false    // Repeat state
}
```

### Theme Slice
```javascript
{
  isDark: true         // Dark/light mode state
}
```

## 🎨 Design System

### Colors
- **Spotify Green**: #1DB954 (primary accent)
- **Background**: Gradient from gray-900 to black
- **Cards**: Semi-transparent gray overlays
- **Text**: White primary, gray-400 secondary

### Animations
- **Hover Effects**: Scale transforms and color transitions
- **Loading States**: Pulse animations for skeletons
- **Equalizer**: Custom CSS animations for playing indicator
- **Smooth Transitions**: 300ms duration for all interactions

## 📊 API Integration

### Mock Music API
- **GET /songs**: Fetch songs with optional genre filter
- **GET /song/:id**: Get individual song details
- **GET /genres**: Available music genres
- **GET /top-songs**: Most popular tracks
- **GET /search**: Search songs by query

### Error Handling
- **Network Errors**: Retry buttons and error messages
- **Loading States**: Skeleton loaders during API calls
- **Empty States**: Helpful messages when no data found

## 🔧 Technical Features

### Performance
- **Code Splitting**: Route-based lazy loading
- **Debounced Search**: Prevents excessive API calls
- **Memoized Components**: Optimized re-renders
- **Efficient State Updates**: Redux Toolkit best practices

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML and ARIA labels
- **Focus Management**: Proper focus indicators
- **Color Contrast**: WCAG compliant color schemes

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (2-column grid)
- **Tablet**: 768px - 1024px (3-column grid)
- **Desktop**: 1024px - 1280px (4-column grid)
- **Large**: > 1280px (5-column grid + sidebar)

Perfect for learning Redux Toolkit, modern React patterns, audio handling, and building production-ready music applications!