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
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {profile.username} — Profile
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
        </div>
      </div>
    </div>
  );
}
