import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [ranks, setRanks] = useState({
    accuracy: null,
    total_correct: null,
    total_quizzes: null,
  });
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
        // fetch ranks in parallel
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

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
          {profile.username}'s Profile
        </h2>

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
