import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box as Fox, Menu, X, Moon, Sun, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-brown-900/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Fox size={28} className="text-orange-500" />
            <span className="text-2xl font-serif font-bold text-brown-800 dark:text-orange-100">
              Kitsunote
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">ホーム</Link>
            <Link to="/explore" className="nav-link">探索</Link>
            <Link to="/map" className="nav-link">マップ</Link>
            <Link to="/community" className="nav-link">コミュニティ</Link>
          </nav>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-brown-800"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-orange-400" />
              ) : (
                <Moon size={20} className="text-brown-600" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                <button 
                  className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-brown-800"
                  aria-label="Notifications"
                >
                  <Bell size={20} className="text-brown-600 dark:text-orange-200" />
                </button>
                <div className="relative group">
                  <Link to={`/profile/${user?.username}`} className="block">
                    <img 
                      src={user?.avatar}
                      alt={user?.displayName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                    />
                  </Link>
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-brown-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to={`/profile/${user?.username}`} className="block px-4 py-2 text-sm text-brown-700 hover:bg-orange-50 dark:text-cream dark:hover:bg-brown-700">プロフィール</Link>
                    <Link to="/subscription" className="block px-4 py-2 text-sm text-brown-700 hover:bg-orange-50 dark:text-cream dark:hover:bg-brown-700">サブスクリプション</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-brown-700 hover:bg-orange-50 dark:text-cream dark:hover:bg-brown-700">ログアウト</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-outline text-sm">ログイン</Link>
                <Link to="/signup" className="btn btn-primary text-sm">新規登録</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-orange-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-brown-600" />
            ) : (
              <Menu size={24} className="text-brown-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brown-900 shadow-lg">
          <div className="py-4 px-6 space-y-3">
            <Link to="/" className="block py-2 text-brown-800 dark:text-orange-100">ホーム</Link>
            <Link to="/explore" className="block py-2 text-brown-800 dark:text-orange-100">探索</Link>
            <Link to="/map" className="block py-2 text-brown-800 dark:text-orange-100">マップ</Link>
            <Link to="/community" className="block py-2 text-brown-800 dark:text-orange-100">コミュニティ</Link>
            
            <div className="pt-4 border-t border-brown-100 dark:border-brown-800">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <img 
                    src={user?.avatar}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div>
                    <p className="font-medium text-brown-800 dark:text-orange-100">{user?.displayName}</p>
                    <button 
                      onClick={logout}
                      className="text-sm text-orange-500 hover:text-orange-600"
                    >
                      ログアウト
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="btn btn-outline w-full">ログイン</Link>
                  <Link to="/signup" className="btn btn-primary w-full">新規登録</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;