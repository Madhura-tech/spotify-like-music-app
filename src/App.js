import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import TopPlay from './components/TopPlay';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import SongDetails from './pages/SongDetails';
import Search from './pages/Search';
import { setTheme } from './store/themeSlice';
import './index.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme === 'dark'));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          <div className="flex-1 px-6 py-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/song/:id" element={<SongDetails />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
          
          <div className="w-80 hidden xl:block">
            <TopPlay />
          </div>
        </div>
        
        <MusicPlayer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;