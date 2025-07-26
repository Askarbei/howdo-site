import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="bg-slate-900 text-white min-h-screen">
        <Header 
          isAuthenticated={isAuthenticated}
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={() => {
            setIsAuthenticated(false);
            setUser(null);
          }}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onGetStarted={() => setShowAuthModal(true)} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} /> : 
              <Navigate to="/" replace />
            } 
          />
        </Routes>

        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onSuccess={(userData) => {
              setIsAuthenticated(true);
              setUser(userData);
              setShowAuthModal(false);
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
