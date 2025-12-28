import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongCard from '../components/SongCard';
import { fetchSongs, fetchGenres, setSelectedGenre } from '../store/musicSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { 
    songs, 
    genres, 
    selectedGenre, 
    loading, 
    error, 
    genresLoading 
  } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSongs(selectedGenre));
  }, [dispatch, selectedGenre]);

  const handleGenreChange = (genre) => {
    dispatch(setSelectedGenre(genre));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-xl mb-4">⚠️ Something went wrong</div>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchSongs(selectedGenre))}
          className="px-4 py-2 bg-spotify-green text-black rounded-full hover:bg-green-400 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Good evening</h1>
        <p className="text-gray-400">Discover new music and enjoy your favorites</p>
      </div>

      {/* Genre Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
        {genresLoading ? (
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre
                    ? 'bg-spotify-green text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Songs Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedGenre === 'All' ? 'Popular Songs' : `${selectedGenre} Music`}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {songs.map((song, index) => (
              <SongCard 
                key={song.id} 
                song={song} 
                playlist={songs}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recently Played Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Made for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Daily Mix 1', 'Daily Mix 2', 'Discover Weekly', 'Release Radar'].map((playlist, index) => (
            <div key={playlist} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="font-semibold mb-1">{playlist}</h3>
              <p className="text-gray-400 text-sm">Your daily mix of music</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;