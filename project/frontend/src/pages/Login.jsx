import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        
        if (onLogin) onLogin();

        navigate('/main');
      } else {
        alert(`Login failed: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Login
              </h2>
              <div className="space-y-4">
                  <input
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"

                  />
                  <button onClick={handleLogin}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Login
                  </button>
                  <p className="text-center text-gray-600 mt-4">
                      Don't have an account?{" "}
                      <a href="/register" className="text-blue-600 hover:underline">
                          Register
                      </a>
                  </p>
              </div>
          </div>
      </div>
  );
}
