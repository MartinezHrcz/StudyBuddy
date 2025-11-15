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
      <div className="min-h-screen flex flex-col items-center pt-16 bg-gray-100">
          <div className="bg-gray-200 p-10 border rounded-lg border-gray-600">
              <h2 className="text-4xl uppercase font-bold text-gray-800 mb-8 text-center">
                  Study Buddy
              </h2>
              <div className="flex flex-col space-y-2 mb-8 ">
                  <button
                      onClick={goToProfile}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                      My profile
                  </button>
                  <button
                      onClick={logout}
                      className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                      Logout
                  </button>
              </div>

              <h2 className="text-4xl uppercase font-bold text-gray-800 mb-8 text-center">
                  Topics
              </h2>

              <ul className="flex flex-col items-center space-y-4">
                  {topics.map((t) => (
                      <li key={t} className="w-full max-w-xs">
                          <button
                              onClick={() => start(t)}
                              className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                          >
                              {t}
                          </button>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
}
