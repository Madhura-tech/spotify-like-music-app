import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiPlay, HiPause } from 'react-icons/hi';
import { fetchTopSongs } from '../store/musicSlice';
import { playSong, setIsPlaying } from '../store/playerSlice';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { topSongs, topSongsLoading } = useSelector((state) => state.music);
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(fetchTopSongs(5));
  }, [dispatch]);

  const handlePlayClick = (song) => {
    const isCurrentSong = currentSong?.id === song.id;
    
    if (isCurrentSong) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(playSong({ song, playlist: topSongs }));
    }
  };

  if (topSongsLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 h-full">
        <h2 className="text-white text-xl font-bold mb-6">Top Charts</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 h-full overflow-y-auto">
      <h2 className="text-white text-xl font-bold mb-6">Top Charts</h2>
      
      <div className="space-y-4">
        {topSongs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          
          return (
            <div
              key={song.id}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="relative">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <button
                  onClick={() => handlePlayClick(song)}
                  className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isCurrentSong && isPlaying ? (
                    <HiPause className="w-5 h-5 text-white" />
                  ) : (
                    <HiPlay className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <Link to={`/song/${song.id}`}>
                  <h4 className="text-white font-medium truncate hover:text-spotify-green transition-colors">
                    {song.title}
                  </h4>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </Link>
              </div>
              
              <div className="text-right">
                <div className="text-white font-bold text-lg">#{index + 1}</div>
                <div className="text-gray-400 text-xs">{song.duration}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently Played */}
      <div className="mt-8">
        <h3 className="text-white text-lg font-semibold mb-4">Recently Played</h3>
        <div className="space-y-3">
          {topSongs.slice(0, 3).map((song) => (
            <div key={`recent-${song.id}`} className="flex items-center space-x-3">
              <img
                src={song.image}
                alt={song.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/song/${song.id}`}>
                  <p className="text-white text-sm font-medium truncate hover:text-spotify-green transition-colors">
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;