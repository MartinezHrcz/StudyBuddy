import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ha valaki közvetlenül írja be a /result-ot, és nincs adat, visszaküldjük a főoldalra
  if (!location.state) {
    return <Navigate to="/main" />;
  }

  const { correct, total, quizId, topic } = location.state;
  const percentage = Math.round((correct / total) * 100);

  function handleRetry() {
    // Visszanavigálunk ugyanarra a kvízre
    navigate(`/quiz/${quizId}`);
  }

  function handleGoHome() {
    navigate('/main');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-lg text-center">
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Quiz Completed!</h1>
        <p className="text-gray-500 mb-8 text-lg">Topic: <span className="font-semibold text-blue-600">{topic}</span></p>

        {/* Eredmény kártya */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="text-6xl font-black text-blue-600 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-700 font-medium">
            You got <span className="text-green-600 font-bold">{correct}</span> out of <span className="text-gray-900 font-bold">{total}</span> questions right.
          </p>
        </div>

        {/* Gombok */}
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