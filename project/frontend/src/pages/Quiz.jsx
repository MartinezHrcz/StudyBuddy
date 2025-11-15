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
    alert(`Result: ${data.correct}/${data.total}`);
    navigate('/main');
  }

  return (
      <div className="min-h-screen flex justify-center py-16 bg-gradient-to-br from-gray-100 to-blue-100">
          <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl px-8 py-10">
              <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-extrabold text-blue-600">
                  Quiz: {quiz.topic}
              </h2>
              <div className="space-y-6">
                  {quiz.questions.map((q) => (
                      <div
                          key={q.id}
                          className="bg-white shadow rounded-lg p-4 space-y-3"
                      >
                          <div className="text-gray-800 font-medium">{q.prompt}</div>
                          <div className="space-y-2">
                              {q.choices.map((c) => (
                                  <label
                                      key={c.id}
                                      className="flex items-center space-x-2 cursor-pointer"
                                  >
                                      <input
                                          type="radio"
                                          name={String(q.id)}
                                          onChange={() => pick(q.id, c.id)}
                                          className="form-radio text-blue-600"
                                      />
                                      <span className="text-gray-700">{c.text}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>

              <button onClick={submit}
                      className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Submit
              </button>
          </div>
      </div>
    </div>
  );
}
