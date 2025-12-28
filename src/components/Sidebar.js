import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiHome, HiSearch, HiHeart, HiCollection, HiSun, HiMoon } from 'react-icons/hi';
import { toggleTheme } from '../store/themeSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  const navLinks = [
    { name: 'Home', to: '/', icon: HiHome },
    { name: 'Search', to: '/search', icon: HiSearch },
    { name: 'Your Library', to: '/library', icon: HiCollection },
    { name: 'Liked Songs', to: '/liked', icon: HiHeart },
  ];

  return (
    <div className="flex flex-col w-64 bg-black text-gray-300 p-6">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center mr-3">
          <span className="text-black font-bold text-lg">♪</span>
        </div>
        <h1 className="text-white text-xl font-bold">Spotify</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <Icon className="w-6 h-6 mr-4" />
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Playlists */}
        <div className="mt-8">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Playlists
          </h3>
          <ul className="space-y-2">
            {['Recently Played', 'Liked Songs', 'My Playlist #1', 'Discover Weekly'].map((playlist) => (
              <li key={playlist}>
                <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {playlist}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Theme Toggle */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          {isDark ? (
            <HiSun className="w-6 h-6 mr-4" />
          ) : (
            <HiMoon className="w-6 h-6 mr-4" />
          )}
          <span className="font-medium">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;