import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Zap } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [ranks, setRanks] = useState({
    accuracy: null,
    total_correct: null,
    total_quizzes: null,
  });
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch("/api/profile/", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((r) => r.json())
      .then((p) => {
        setProfile(p);
        if (token) {
          const metrics = ["accuracy", "total_correct", "total_quizzes"];
          Promise.all(
            metrics.map((m) =>
              fetch(`/api/leaderboard/me/?metric=${m}`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then(async (res) => {
                if (!res.ok) return null;
                try {
                  return await res.json();
                } catch (_) {
                  return null;
                }
              })
            )
          ).then(([acc, tc, tq]) => {
            setRanks({
              accuracy: acc && acc.rank ? acc.rank : null,
              total_correct: tc && tc.rank ? tc.rank : null,
              total_quizzes: tq && tq.rank ? tq.rank : null,
            });
          });

          // Fetch user's past quiz attempts
          fetch("/api/profile/attempts/", {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((r) => r.json())
            .then((data) => {
              setAttempts(data.attempts || []);
            })
            .catch((_) => {
              setAttempts([]);
            });
        }
      });
  }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <span className="text-lg text-gray-700">Loading profile...</span>
            </div>
        );
    }

    const progressPercent = Math.min(100, Math.max(0, (profile.xp_progress / profile.xp_per_level) * 100));

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
          {profile.username}'s Profile
        </h2>


        <div className="bg-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-full">
                        <Award className="w-8 h-8 text-yellow-300" />
                    </div>
                    <div>
                        <p className="text-indigo-100 text-sm font-medium">Current Level</p>
                        <p className="text-4xl font-bold">{profile.current_level}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-indigo-100 text-sm font-medium">Total XP</p>
                    <p className="text-2xl font-bold flex items-center justify-end gap-1">
                        <Zap className="w-5 h-5 text-yellow-300 fill-current"/> {profile.total_xp}
                    </p>
                </div>
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between text-xs text-indigo-200 mb-1">
                    <span>Progress to Level {profile.current_level + 1}</span>
                    <span>{profile.xp_progress} / {profile.xp_per_level} XP</span>
                </div>
                <div className="w-full bg-indigo-900/30 rounded-full h-3">
                    <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </div>

      <div className="divide-y divide-gray-200">
          <div className="flex justify-between py-4">
            <span className="text-gray-700 font-medium">Quizzes taken:</span>
            <span className="text-gray-900 font-semibold">
              {profile.total_quizzes}
              {ranks.total_quizzes ? (
                <small className="ml-2 text-sm text-gray-500">(Rank: #{ranks.total_quizzes})</small>
              ) : null}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 font-medium">Total questions:</span>
            <span className="text-gray-900 font-semibold">
              {profile.total_questions}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 font-medium">Correct answers:</span>
            <span className="text-gray-900 font-semibold">
              {profile.total_correct}
              {ranks.total_correct ? (
                <small className="ml-2 text-sm text-gray-500">(Rank: #{ranks.total_correct})</small>
              ) : null}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 font-medium">Accuracy:</span>
            <span className="text-gray-900 font-semibold">
              {profile.accuracy_percent}%
              {ranks.accuracy ? (
                <small className="ml-2 text-sm text-gray-500">(Rank: #{ranks.accuracy})</small>
              ) : null}
            </span>
          </div>

          {/* Past Attempts Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Recent Quiz Attempts
            </h3>
            {attempts.length === 0 ? (
              <p className="text-gray-500 text-sm">No quiz attempts yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Topic</th>
                      <th className="text-center px-3 py-2 font-semibold">Score</th>
                      <th className="text-center px-3 py-2 font-semibold">Accuracy</th>
                      <th className="text-right px-3 py-2 font-semibold">Date</th>
                      <th className="text-center px-3 py-2 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium text-gray-700">{attempt.topic}</td>
                        <td className="text-center px-3 py-2">
                          {attempt.correct}/{attempt.total}
                        </td>
                        <td className="text-center px-3 py-2">
                          <span className={`font-semibold ${attempt.accuracy >= 70 ? 'text-green-600' : attempt.accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {attempt.accuracy}%
                          </span>
                        </td>
                        <td className="text-right px-3 py-2 text-gray-600 text-xs">
                          {attempt.started_at ? new Date(attempt.started_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="text-center px-3 py-2">
                          <button
                            onClick={() => navigate(`/quiz/${attempt.quiz_id}?retake=true`)}
                            className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition"
                          >
                            Retake
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

            <div className="mt-10 flex justify-center">
                <button
                    onClick={() => navigate("/main")}
                    className="px-5 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                >
                    ← Back to Home
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}