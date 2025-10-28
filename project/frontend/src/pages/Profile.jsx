import React, {useEffect, useState} from 'react'

export default function Profile(){
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    fetch('/api/profile/',{
      headers:{ 'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '' }
    }).then(r=>r.json()).then(setProfile)
  },[])

  if(!profile) return <div>Login to see your profile</div>

  return (
    <div>
      <h2>{profile.username} — Profile</h2>
      <div>Quizzes taken: {profile.total_quizzes}</div>
      <div>Total questions: {profile.total_questions}</div>
      <div>Correct answers: {profile.total_correct}</div>
      <div>Accuracy: {profile.accuracy_percent}%</div>
    </div>
  )
}
