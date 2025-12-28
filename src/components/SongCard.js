import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiPlay, HiPause } from 'react-icons/hi';
import { playSong, setIsPlaying } from '../store/playerSlice';

const SongCard = ({ song, playlist = [], index }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentSong) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(playSong({ song, playlist }));
    }
  };

  return (
    <div className="group relative bg-gray-900/40 hover:bg-gray-800/60 rounded-lg p-4 transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={song.image}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        
        {/* Play Button Overlay */}
        <button
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          {isCurrentSong && isPlaying ? (
            <HiPause className="w-6 h-6 text-black" />
          ) : (
            <HiPlay className="w-6 h-6 text-black ml-1" />
          )}
        </button>

        {/* Playing Indicator */}
        {isCurrentSong && isPlaying && (
          <div className="absolute top-2 left-2 flex space-x-1">
            <div className="w-1 bg-spotify-green rounded-full equalizer-bar"></div>
            <div className="w-1 bg-spotify-green rounded-full equalizer-bar"></div>
            <div className="w-1 bg-spotify-green rounded-full equalizer-bar"></div>
            <div className="w-1 bg-spotify-green rounded-full equalizer-bar"></div>
          </div>
        )}
      </div>

      <Link to={`/song/${song.id}`} className="block">
        <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-spotify-green transition-colors">
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm truncate mb-2">{song.artist}</p>
        <p className="text-gray-500 text-xs">{song.album}</p>
      </Link>

      {/* Additional Info */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span>{song.duration}</span>
        <span className="bg-gray-700 px-2 py-1 rounded-full">{song.genre}</span>
      </div>
    </div>
  );
};

export default SongCard;