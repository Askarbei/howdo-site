import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, user, onAuthClick, onLogout }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            HowDo
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Возможности
            </Link>
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Цены
            </Link>
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Auth Button */}
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Дашборд
                </Link>
                <span className="text-slate-300">
                  {user?.email}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-slate-700 border border-purple-600 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-purple-800 border border-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
