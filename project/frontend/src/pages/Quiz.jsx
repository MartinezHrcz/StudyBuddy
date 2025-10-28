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
    <div>
      <h2>Quiz: {quiz.topic}</h2>
      {quiz.questions.map(q => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <div>{q.prompt}</div>
          <div>
            {q.choices.map(c => (
              <label key={c.id} style={{ display: 'block' }}>
                <input
                  type='radio'
                  name={String(q.id)}
                  onChange={() => pick(q.id, c.id)}
                />
                {c.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
