import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`/api/quizzes/${id}/`)
      .then(r => r.json())
      .then(data => {
        //console.log('Fetched quiz:', data);
        setQuiz(data);
      });
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  function pick(qid, choiceId) {
    setAnswers(a => ({ ...a, [qid]: choiceId }));
  }

  async function submit() {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`/api/quizzes/${id}/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ answers })
    });

    const data = await res.json();
    
    navigate('/result', { 
      state: { 
        correct: data.correct, 
        total: data.total, 
        quizId: id,
        topic: quiz.topic 
      } 
    });
  }

  return (
      <div className="min-h-screen flex justify-center py-16 bg-gradient-to-br from-gray-100 to-blue-100">
          <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl px-8 py-10">

              <h2 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">
                Quiz: {quiz.topic}
              </h2>

              <div className="space-y-8">
                  {quiz.questions.map((q) => (
                      <div
                          key={q.id}
                          className="p-6 bg-gray-50 rounded-xl shadow-sm"
                      >
                          <div className="font-semibold text-lg text-gray-800 mb-4">
                              {q.prompt}
                          </div>
                          <div className="space-y-2">
                              {q.choices.map((c) => (
                                  <label
                                      key={c.id}
                                      className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition"
                                  >
                                      <input
                                          type="radio"
                                          name={String(q.id)}
                                          onChange={() => pick(q.id, c.id)}
                                          className="form-radio text-blue-500"
                                      />
                                      <span className="text-gray-700">{c.text}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>

              <button onClick={submit}
                      className="mt-10 w-full py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition">
                  Submit
              </button>
          </div>
      </div>
  );
}
