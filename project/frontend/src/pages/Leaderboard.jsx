import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METRICS = [
  { value: 'accuracy', label: 'Accuracy' },
  { value: 'total_correct', label: 'Total Correct' },
  { value: 'total_quizzes', label: 'Total Quizzes' },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [metric, setMetric] = useState('accuracy');
  const [limit, setLimit] = useState(10);
  const [entries, setEntries] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric, limit]);

  async function fetchLeaderboard() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/leaderboard/?metric=${metric}&limit=${limit}`);
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      setEntries(data.results || []);
    } catch (err) {
      setError('Could not load leaderboard: ' + err);
      setEntries([]);
    } finally {
      setLoading(false);
    }

    // try fetch my rank if logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const r = await fetch(`http://localhost:8000/api/leaderboard/me/?metric=${metric}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (r.ok) {
          const jd = await r.json();
          setMyRank(jd);
        } else {
          setMyRank(null);
        }
      } catch (_) {
        setMyRank(null);
      }
    } else {
      setMyRank(null);
    }
  }

  function goToMain() {
    navigate('/main');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <div className="flex items-center space-x-3">
            <button onClick={goToMain} className="px-3 py-1 bg-blue-500 text-white rounded">Back</button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <span className="text-sm">Metric</span>
            <select className="ml-2 border rounded px-2 py-1" value={metric} onChange={e => setMetric(e.target.value)}>
              {METRICS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </label>
          <label className="flex items-center space-x-2">
            <span className="text-sm">Limit</span>
            <input type="number" min="1" max="200" value={limit} onChange={e => setLimit(Number(e.target.value))}
                   className="w-20 ml-2 border rounded px-2 py-1" />
          </label>
          <button onClick={fetchLeaderboard} className="ml-auto px-3 py-1 bg-green-500 text-white rounded">Refresh</button>
        </div>

        {loading && <div className="py-6 text-center">Loading...</div>}
        {error && <div className="py-4 text-red-600">{error}</div>}

        {!loading && !error && (
          <div>
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">#</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Total Correct</th>
                  <th className="py-2">Total Questions</th>
                  <th className="py-2">Total Quizzes</th>
                  <th className="py-2">Accuracy %</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 align-top">{i + 1}</td>
                    <td className="py-2 align-top font-medium">{e.username}</td>
                    <td className="py-2 align-top">{e.total_correct}</td>
                    <td className="py-2 align-top">{e.total_questions}</td>
                    <td className="py-2 align-top">{e.total_quizzes}</td>
                    <td className="py-2 align-top">{e.accuracy}%</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr><td colSpan="6" className="py-6 text-center text-gray-500">No results</td></tr>
                )}
              </tbody>
            </table>

            {myRank && (
              <div className="mt-6 p-4 bg-blue-50 rounded">
                <div className="text-sm text-gray-700">Your stats</div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="font-medium">{myRank.username}</div>
                    <div className="text-sm text-gray-600">Rank: {myRank.rank}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{metric === 'accuracy' ? `${myRank.metric_value}%` : myRank.metric_value}</div>
                    <div className="text-sm text-gray-600">Quizzes: {myRank.total_quizzes}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
