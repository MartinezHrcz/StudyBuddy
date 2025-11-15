import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('access_token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={token ? <Navigate to="/main" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setToken(localStorage.getItem('access_token'))} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={token ? <Main /> : <Navigate to="/login" />} />
        <Route path="/quiz/:id" element={token ? <Quiz /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}