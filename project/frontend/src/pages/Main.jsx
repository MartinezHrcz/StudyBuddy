import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

const topics = ['Math', 'History', 'Physics', 'Programming', 'Biology', 'Geography', 'Basic-Economics', 'Chemistry'];

export default function Main() {
  const navigate = useNavigate();
  const [customTopic, setCustomTopic] = useState('');

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

  function goToLeaderboard() {
    navigate('/leaderboard');
  }

  function submitCustomTopic(e) {
    e && e.preventDefault && e.preventDefault();
    const t = (customTopic || '').trim();
    if (!t) return;
    start(t);
    setCustomTopic('');
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-500 flex items-center justify-center py-12 px-4 relative">
          <div className="bg-white shadow-xl rounded-3xl w-full max-w-lg p-8 md:p-12">
              <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-10 tracking-wide">
                  Study Buddy
              </h1>
                <div className="flex flex-col sm:flex-row justify-between mb-10">
                  <button
                    onClick={goToProfile}
                    className="flex-1 mx-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition"
                  >
                    My profile
                  </button>
                  <button
                    onClick={goToLeaderboard}
                    className="flex-1 mx-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
                  >
                    Leaderboard
                  </button>
                  <button
                    onClick={logout}
                    className="flex-1 mx-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-800 transition"
                  >
                    Logout
                  </button>
                </div>

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                  Select a topic
              </h2>

              

              <ul className="flex flex-col items-center space-y-4">
                  <li className="w-full max-w-xs">
                    <form onSubmit={submitCustomTopic} className="w-full flex">
                      <input
                        type="text"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="Or enter a custom topic..."
                        className="flex-1 px-5 py-4 border rounded-l-lg focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-5 py-4 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-800 transition text-lg font-medium"
                      >
                        Start
                      </button>
                    </form>
                  </li>
                  {topics.map((t) => (
                      <li key={t} className="w-full max-w-xs">
                          <button
                              onClick={() => start(t)}
                              className="w-full px-5 py-4 bg-green-500 text-white rounded-lg text-lg font-medium hover:bg-green-800 transition"
                          >
                              {t}
                          </button>
                      </li>
                  ))}
              </ul>
          </div>
          
          
          <ChatWindow />
      </div>
  );
}