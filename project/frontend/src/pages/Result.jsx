import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/main" />;
  }


  const { correct, total, xp_earned, quizId, topic, is_retake } = location.state;
  const percentage = Math.round((correct / total) * 100);

  function handleRetry() {
    navigate(`/quiz/${quizId}`);
  }

  function handleGoHome() {
    navigate('/main');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-lg text-center">
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Quiz Completed!</h1>
        <p className="text-gray-500 mb-8 text-lg">Topic: <span className="font-semibold text-blue-600">{topic}</span>{is_retake && <span className="ml-2 text-sm text-gray-400">(Retake)</span>}</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
          <div className="text-6xl font-black text-blue-600 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-700 font-medium">
            You got <span className="text-green-600 font-bold">{correct}</span> out of <span className="text-gray-900 font-bold">{total}</span> questions right.
          </p>
        </div>

        {xp_earned > 0 && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-center gap-2">
                <Star className="text-yellow-500 w-6 h-6 fill-current" />
                <span className="text-xl font-bold text-yellow-700">+{xp_earned} XP Earned!</span>
            </div>
        )}

        {is_retake && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700 font-semibold">ℹ️ This is a retake attempt. Your score does not affect your leaderboard rank or XP.</p>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="flex-1 px-6 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition shadow-md"
          >
            Retry Quiz
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            Back to Main
          </button>
        </div>

      </div>
    </div>
  );
}