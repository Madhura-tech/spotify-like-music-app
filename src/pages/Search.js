import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiSearch, HiX } from 'react-icons/hi';
import SongCard from '../components/SongCard';
import { searchSongs, setSearchQuery, clearSearchResults } from '../store/musicSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState('');
  const { searchResults, searchQuery, loading } = useSelector((state) => state.music);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localQuery.trim()) {
        dispatch(setSearchQuery(localQuery));
        dispatch(searchSongs(localQuery));
      } else {
        dispatch(clearSearchResults());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localQuery, dispatch]);

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(clearSearchResults());
  };

  const popularSearches = [
    'Pop hits', 'Rock classics', 'Hip-hop', 'Jazz', 'Electronic', 'Indie'
  ];

  const recentSearches = [
    'The Weeknd', 'Ed Sheeran', 'Queen', 'Michael Jackson'
  ];

  return (
    <div className="text-white">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        {/* Search Input */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
          />
          {localQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <HiX className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Search results for "{searchQuery}"
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
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((song, index) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  playlist={searchResults}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No results found</div>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      )}

      {/* Browse Categories */}
      {!searchQuery && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Pop', color: 'from-pink-500 to-purple-500' },
                { name: 'Rock', color: 'from-red-500 to-orange-500' },
                { name: 'Hip-Hop', color: 'from-green-500 to-blue-500' },
                { name: 'Jazz', color: 'from-yellow-500 to-red-500' },
                { name: 'Electronic', color: 'from-purple-500 to-pink-500' },
                { name: 'Classical', color: 'from-blue-500 to-indigo-500' },
                { name: 'Country', color: 'from-orange-500 to-yellow-500' },
                { name: 'R&B', color: 'from-indigo-500 to-purple-500' },
              ].map((genre) => (
                <div
                  key={genre.name}
                  className={`relative h-32 rounded-lg bg-gradient-to-br ${genre.color} cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
                  onClick={() => {
                    setLocalQuery(genre.name);
                  }}
                >
                  <div className="absolute inset-0 p-4 flex items-end">
                    <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                  </div>
                  <div className="absolute top-2 right-2 w-16 h-16 bg-black/20 rounded-lg transform rotate-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Popular searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setLocalQuery(search)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent searches</h2>
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setLocalQuery(search)}
                  className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <HiSearch className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;