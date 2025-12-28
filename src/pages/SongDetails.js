import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlay, HiPause, HiArrowLeft, HiHeart, HiShare } from 'react-icons/hi';
import { fetchSongById } from '../store/musicSlice';
import { playSong, setIsPlaying } from '../store/playerSlice';

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentSong: songDetails, loading, error } = useSelector((state) => state.music);
  const { currentSong: playingSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    if (id) {
      dispatch(fetchSongById(id));
    }
  }, [dispatch, id]);

  const handlePlayClick = () => {
    if (!songDetails) return;
    
    const isCurrentSong = playingSong?.id === songDetails.id;
    
    if (isCurrentSong) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(playSong({ song: songDetails, playlist: [songDetails] }));
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <HiArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-80 h-80 bg-gray-700 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-700 rounded mb-4 w-1/2"></div>
              <div className="h-6 bg-gray-700 rounded mb-2 w-1/3"></div>
              <div className="h-4 bg-gray-700 rounded mb-4 w-1/4"></div>
              <div className="h-12 bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !songDetails) {
    return (
      <div className="text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <HiArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-xl mb-4">⚠️ Song not found</div>
          <p className="text-gray-400 mb-4">{error || 'The requested song could not be found.'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-spotify-green text-black rounded-full hover:bg-green-400 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isCurrentSong = playingSong?.id === songDetails.id;

  return (
    <div className="text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <HiArrowLeft className="w-6 h-6" />
        <span>Back</span>
      </button>

      {/* Song Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative group">
          <img
            src={songDetails.image}
            alt={songDetails.title}
            className="w-80 h-80 rounded-lg shadow-2xl object-cover"
          />
          
          {/* Play Button Overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              {isCurrentSong && isPlaying ? (
                <HiPause className="w-10 h-10 text-black" />
              ) : (
                <HiPlay className="w-10 h-10 text-black ml-1" />
              )}
            </div>
          </button>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-2">SONG</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{songDetails.title}</h1>
          <div className="flex items-center space-x-2 text-gray-300 mb-6">
            <span className="font-semibold">{songDetails.artist}</span>
            <span>•</span>
            <span>{songDetails.album}</span>
            <span>•</span>
            <span>{songDetails.duration}</span>
            <span>•</span>
            <span>{songDetails.plays?.toLocaleString()} plays</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayClick}
              className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isCurrentSong && isPlaying ? (
                <HiPause className="w-7 h-7 text-black" />
              ) : (
                <HiPlay className="w-7 h-7 text-black ml-1" />
              )}
            </button>
            
            <button className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
              <HiHeart className="w-6 h-6" />
            </button>
            
            <button className="w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors">
              <HiShare className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Song Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Artist:</span>
              <span>{songDetails.artist}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Album:</span>
              <span>{songDetails.album}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Genre:</span>
              <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">{songDetails.genre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span>{songDetails.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Plays:</span>
              <span>{songDetails.plays?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-300 leading-relaxed">
            {songDetails.description || 
             `"${songDetails.title}" is a captivating track by ${songDetails.artist} from the album "${songDetails.album}". This ${songDetails.genre.toLowerCase()} masterpiece showcases the artist's unique style and has garnered ${songDetails.plays?.toLocaleString()} plays from music lovers worldwide.`
            }
          </p>
        </div>
      </div>

      {/* Lyrics Section (Mock) */}
      <div className="mt-8 bg-gray-900/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Lyrics</h3>
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p className="italic text-gray-400">Lyrics not available for this track.</p>
          <p className="text-sm text-gray-500">
            Lyrics are provided by music publishers and may not be available for all songs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;