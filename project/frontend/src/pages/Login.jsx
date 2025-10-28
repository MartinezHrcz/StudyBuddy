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

      const data = await res.json(); // 🔹 fontos: ez kell, mielőtt a res.ok-ot ellenőrzöd

      if (res.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // 🔹 ha van onLogin prop (App.jsx-ből), frissíti a token state-et
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
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
