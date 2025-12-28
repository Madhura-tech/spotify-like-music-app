import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  HiPlay, 
  HiPause, 
  HiRewind, 
  HiFastForward, 
  HiVolumeUp, 
  HiVolumeOff,
  HiSwitchHorizontal,
  HiRefresh
} from 'react-icons/hi';
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setIsMuted,
  setIsShuffled,
  setIsRepeated,
  playNext,
  playPrevious,
  setAudioRef,
} from '../store/playerSlice';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    isRepeated,
  } = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(setAudioRef(audioRef.current));
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    if (isRepeated) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(playNext());
    }
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (newVolume > 0 && isMuted) {
      dispatch(setIsMuted(false));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center space-x-4 w-1/4 min-w-0">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/2 max-w-md">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={() => dispatch(setIsShuffled(!isShuffled))}
              className={`p-2 rounded-full transition-colors ${
                isShuffled ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <HiSwitchHorizontal className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => dispatch(playPrevious())}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HiRewind className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => dispatch(setIsPlaying(!isPlaying))}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <HiPause className="w-5 h-5 text-black" />
              ) : (
                <HiPlay className="w-5 h-5 text-black ml-1" />
              )}
            </button>
            
            <button
              onClick={() => dispatch(playNext())}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HiFastForward className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => dispatch(setIsRepeated(!isRepeated))}
              className={`p-2 rounded-full transition-colors ${
                isRepeated ? 'text-spotify-green' : 'text-gray-400 hover:text-white'
              }`}
            >
              <HiRefresh className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-white rounded-full relative group-hover:bg-spotify-green transition-colors"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button
            onClick={() => dispatch(setIsMuted(!isMuted))}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <HiVolumeOff className="w-5 h-5" />
            ) : (
              <HiVolumeUp className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;