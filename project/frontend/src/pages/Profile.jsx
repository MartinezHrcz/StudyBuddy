import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/profile/", {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")}`
          : "",
      },
    })
      .then((r) => r.json())
      .then(setProfile);
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
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-700 font-medium">Accuracy:</span>
            <span className="text-gray-900 font-semibold">
              {profile.accuracy_percent}%
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
