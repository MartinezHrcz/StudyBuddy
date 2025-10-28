import React from 'react';
import { useNavigate } from 'react-router-dom';

const topics = ['Math', 'History', 'Physics', 'Programming', 'Biology'];

export default function Main() {
  const navigate = useNavigate();

  async function start(topic) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('You must login first.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/quizzes/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ topic })
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        alert('Backend returned invalid JSON:\n' + text);
        return;
      }

      if (res.ok) navigate(`/quiz/${data.id}`);
      else alert(JSON.stringify(data));

    } catch (err) {
      alert('Fetch error: ' + err);
    }
  }

  function goToProfile() {
    navigate('/profile');
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Choose a topic</h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={goToProfile}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Profilom
        </button>

        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Kijelentkezés
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {topics.map(t => (
          <li key={t} style={{ margin: '10px 0' }}>
            <button
              onClick={() => start(t)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
