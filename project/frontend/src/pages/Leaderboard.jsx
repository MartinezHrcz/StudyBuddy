import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, BarChart2, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const METRICS = [
    { value: 'accuracy', label: 'Accuracy', format: (v) => `${v}%` },
    { value: 'total_correct', label: 'Total Correct', format: (v) => v },
    { value: 'total_quizzes', label: 'Total Quizzes', format: (v) => v },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [metric, setMetric] = useState('accuracy');
  const [limit, setLimit] = useState(10);
  const [entries, setEntries] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
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
  }, [metric, limit]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

  function goToMain() {
    navigate('/main');
  }

    const currentMetric = METRICS.find(m => m.value === metric);

  return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">

              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4">
                  <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
                      <BarChart2 className="w-7 h-7 mr-3 text-indigo-600" />
                      Global Leaderboard
                  </h1>
                  <button
                      onClick={goToMain}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                  >
                      Go Back
                  </button>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                      <span>Sort By:</span>
                      <select
                          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                          value={metric}
                          onChange={e => setMetric(e.target.value)}
                      >
                          {METRICS.map(m => (
                              <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                      </select>
                  </label>
                  <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                      <span>Show Top:</span>
                      <input
                          type="number"
                          min="1"
                          max="200"
                          value={limit}
                          onChange={e => setLimit(Math.max(1, Math.min(200, Number(e.target.value))))} // Input sanitization
                          className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                  </label>
                  <button
                      onClick={fetchLeaderboard}
                      className="md:ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 shadow-md flex items-center justify-center"
                      disabled={loading}
                  >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
              </div>

              {loading && entries.length === 0 && (
                  <div className="py-12 text-center text-indigo-600 font-semibold text-lg">
                      <svg className="animate-spin h-6 w-6 text-indigo-600 inline-block mr-3" viewBox="0 0 24 24">...</svg>
                      Loading Leaderboard...
                  </div>
              )}
              {error && (
                  <div className="flex items-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4">
                      <AlertTriangle className="w-5 h-5 mr-3" />
                      <span className="font-medium">Error:</span> {error}
                  </div>
              )}

              {/* Leaderboard Table */}
              {!loading && !error && (
                  <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-100">
                      <table className="w-full text-left table-auto">
                          <thead className="bg-indigo-50 border-b border-indigo-200">
                          <tr>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Total Correct</th>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Total Questions</th>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Total Quizzes</th>
                              <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-right">Accuracy</th>
                          </tr>
                          </thead>
                          <tbody>
                          {entries.map((e, i) => (
                              <tr key={e.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition duration-100`}>
                                  <td className="py-3 px-4 font-bold text-gray-800">
                                      {/* Highlight top 3 with color/style */}
                                      {i < 3 ? (
                                          <span className={`text-lg ${i === 0 ? 'text-yellow-600' : i === 1 ? 'text-gray-500' : 'text-amber-700'}`}>
                                #{i + 1}
                            </span>
                                      ) : (
                                          <span className="text-gray-600">#{i + 1}</span>
                                      )}
                                  </td>
                                  <td className="py-3 px-4 font-medium text-indigo-700">{e.username}</td>
                                  <td className="py-3 px-4 text-right">{e.total_correct}</td>
                                  <td className="py-3 px-4 text-right">{e.total_questions}</td>
                                  <td className="py-3 px-4 text-right">{e.total_quizzes}</td>
                                  <td className="py-3 px-4 text-right font-semibold text-green-600">{e.accuracy}%</td>
                              </tr>
                          ))}
                          {entries.length === 0 && (
                              <tr><td colSpan="6" className="py-8 text-center text-gray-500">No leaderboard results found.</td></tr>
                          )}
                          </tbody>
                      </table>
                  </div>
              )}

              {myRank && (
                  <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200 shadow-md">
                      <h3 className="text-lg font-bold text-indigo-800 flex items-center mb-3">
                          <span className="mr-2">👑</span> Your Global Rank
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                          <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-100">
                              <div className="text-2xl font-extrabold text-indigo-600">{myRank.rank}</div>
                              <div className="text-xs text-gray-500 mt-1">Global Rank</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-100">
                              <div className="text-2xl font-extrabold text-gray-800">{myRank.total_quizzes}</div>
                              <div className="text-xs text-gray-500 mt-1">Total Quizzes</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-100">
                              <div className="text-2xl font-extrabold text-gray-800">{myRank.total_correct}</div>
                              <div className="text-xs text-gray-500 mt-1">Total Correct</div>
                          </div>
                          {myRank && (
                              <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-100">
                                  <div className="text-2xl font-extrabold text-green-600">
                                      {currentMetric?.format(myRank.metric_value) ?? 'N/A'}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
}
