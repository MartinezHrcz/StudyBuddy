import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);

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

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Quizzes taken:</span>
            <span className="font-medium text-gray-800">
              {profile.total_quizzes}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Total questions:</span>
            <span className="font-medium text-gray-800">
              {profile.total_questions}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Correct answers:</span>
            <span className="font-medium text-gray-800">
              {profile.total_correct}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Accuracy:</span>
            <span className="font-medium text-gray-800">
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
