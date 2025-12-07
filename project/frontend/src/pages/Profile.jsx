import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Zap } from "lucide-react";
import ThemeSwitcher from "../components/ThemeSwitcher";

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
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 hc:bg-black">
        <span className="text-lg text-gray-700 dark:text-gray-300 hc:text-yellow-300">Loading profile...</span>
      </div>
    );
  }

  const progressPercent = Math.min(100, Math.max(0, (profile.xp_progress / profile.xp_per_level) * 100));

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 hc:from-black hc:to-black transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 hc:bg-black hc:border-2 hc:border-white shadow-2xl rounded-3xl p-10 w-full max-w-xl transition-colors duration-300">
        <div className="flex justify-end mb-4">
          <ThemeSwitcher />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 hc:text-yellow-300 mb-8 tracking-wide">
          {profile.username}'s Profile
        </h2>


        <div className="bg-indigo-600 dark:bg-indigo-800 hc:bg-gray-900 hc:border hc:border-white rounded-2xl p-6 text-white mb-8 shadow-lg relative overflow-hidden transition-colors duration-300">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Award className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <p className="text-indigo-100 dark:text-indigo-200 hc:text-white text-sm font-medium">Current Level</p>
                <p className="text-4xl font-bold hc:text-yellow-300">{profile.current_level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 dark:text-indigo-200 hc:text-white text-sm font-medium">Total XP</p>
              <p className="text-2xl font-bold flex items-center justify-end gap-1 hc:text-yellow-300">
                <Zap className="w-5 h-5 text-yellow-300 fill-current" /> {profile.total_xp}
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between text-xs text-indigo-200 dark:text-indigo-300 hc:text-white mb-1">
              <span>Progress to Level {profile.current_level + 1}</span>
              <span>{profile.xp_progress} / {profile.xp_per_level} XP</span>
            </div>
            <div className="w-full bg-indigo-900/30 rounded-full h-3 hc:border hc:border-white">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700 hc:divide-white">
          <div className="flex justify-between py-4">
            <span className="text-gray-700 dark:text-gray-300 hc:text-white font-medium">Quizzes taken:</span>
            <span className="text-gray-900 dark:text-white hc:text-yellow-300 font-semibold">
              {profile.total_quizzes}
              {ranks.total_quizzes ? (
                <small className="ml-2 text-sm text-gray-500 dark:text-gray-400 hc:text-gray-300">(Rank: #{ranks.total_quizzes})</small>
              ) : null}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 dark:text-gray-300 hc:text-white font-medium">Total questions:</span>
            <span className="text-gray-900 dark:text-white hc:text-yellow-300 font-semibold">
              {profile.total_questions}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 dark:text-gray-300 hc:text-white font-medium">Correct answers:</span>
            <span className="text-gray-900 dark:text-white hc:text-yellow-300 font-semibold">
              {profile.total_correct}
              {ranks.total_correct ? (
                <small className="ml-2 text-sm text-gray-500 dark:text-gray-400 hc:text-gray-300">(Rank: #{ranks.total_correct})</small>
              ) : null}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 dark:text-gray-300 hc:text-white font-medium">Accuracy:</span>
            <span className="text-gray-900 dark:text-white hc:text-yellow-300 font-semibold">
              {profile.accuracy_percent}%
              {ranks.accuracy ? (
                <small className="ml-2 text-sm text-gray-500 dark:text-gray-400 hc:text-gray-300">(Rank: #{ranks.accuracy})</small>
              ) : null}
            </span>
          </div>

          {/* Past Attempts Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 hc:border-white">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white hc:text-yellow-300 mb-4 flex items-center gap-2">
              <span>📋</span> Recent Quiz Attempts
            </h3>
            {attempts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 hc:text-white text-sm">No quiz attempts yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700 hc:bg-gray-900 border-b dark:border-gray-600 hc:border-white">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 hc:text-white">Topic</th>
                      <th className="text-center px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 hc:text-white">Score</th>
                      <th className="text-center px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 hc:text-white">Accuracy</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 hc:text-white">Date</th>
                      <th className="text-center px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 hc:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 hc:divide-white">
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 hc:hover:bg-gray-900 transition-colors">
                        <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-300 hc:text-white">{attempt.topic}</td>
                        <td className="text-center px-3 py-2 text-gray-700 dark:text-gray-300 hc:text-white">
                          {attempt.correct}/{attempt.total}
                        </td>
                        <td className="text-center px-3 py-2">
                          <span className={`font-semibold ${attempt.accuracy >= 70 ? 'text-green-600 dark:text-green-400 hc:text-green-300' : attempt.accuracy >= 50 ? 'text-yellow-600 dark:text-yellow-400 hc:text-yellow-300' : 'text-red-600 dark:text-red-400 hc:text-red-300'}`}>
                            {attempt.accuracy}%
                          </span>
                        </td>
                        <td className="text-right px-3 py-2 text-gray-600 dark:text-gray-400 hc:text-gray-300 text-xs">
                          {attempt.started_at ? new Date(attempt.started_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="text-center px-3 py-2">
                          <button
                            onClick={() => navigate(`/quiz/${attempt.quiz_id}?retake=true`)}
                            className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition hc:border hc:border-white"
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
              className="px-5 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition hc:border hc:border-white"
            >
              ← Back to Home
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="px-5 py-3 bg-gray-100 dark:bg-gray-700 hc:bg-black text-gray-700 dark:text-gray-200 hc:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition border border-gray-300 dark:border-gray-600 hc:border-white ml-4"
            >
              Change Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}