import axios from 'axios';

// Mock data for demonstration
const mockSongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    genre: "Pop",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    plays: 2500000
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "3:53",
    genre: "Pop",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    plays: 3200000
  },
  {
    id: 3,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    genre: "Rock",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    plays: 1800000
  },
  {
    id: 4,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: "4:54",
    genre: "Pop",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    plays: 2100000
  },
  {
    id: 5,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: "6:30",
    genre: "Rock",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    plays: 1900000
  },
  {
    id: 6,
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile Soundtrack",
    duration: "5:26",
    genre: "Hip-Hop",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    plays: 2800000
  }
];

const mockGenres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Electronic', 'Classical'];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const musicAPI = {
  // Get all songs
  getSongs: async (genre = 'All') => {
    await delay(1000); // Simulate network delay
    
    if (Math.random() < 0.1) { // 10% chance of error for demonstration
      throw new Error('Failed to fetch songs');
    }
    
    const filteredSongs = genre === 'All' 
      ? mockSongs 
      : mockSongs.filter(song => song.genre === genre);
    
    return {
      data: {
        songs: filteredSongs,
        total: filteredSongs.length
      }
    };
  },

  // Get song by ID
  getSongById: async (id) => {
    await delay(500);
    
    const song = mockSongs.find(s => s.id === parseInt(id));
    if (!song) {
      throw new Error('Song not found');
    }
    
    return { data: song };
  },

  // Get genres
  getGenres: async () => {
    await delay(300);
    return { data: mockGenres };
  },

  // Get top songs
  getTopSongs: async (limit = 5) => {
    await delay(800);
    
    const topSongs = [...mockSongs]
      .sort((a, b) => b.plays - a.plays)
      .slice(0, limit);
    
    return { data: topSongs };
  },

  // Search songs
  searchSongs: async (query) => {
    await delay(600);
    
    const results = mockSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase())
    );
    
    return { data: results };
  }
};