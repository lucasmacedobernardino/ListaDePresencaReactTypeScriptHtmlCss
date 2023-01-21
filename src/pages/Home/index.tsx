import React, { useState, useEffect} from 'react';
import './styles.css'
import { Card, CardProps} from '../../components/Card';


type User = {
  name: string
  avatar: string
}

export function Home() {

  const[studentName, setstudentName] = useState('')
  const[student, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User) 
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/lukasombrado')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData()
  },[])
  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder='Digite o nome...'
        onChange={e => setstudentName(e.target.value)}
      />
      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        student.map(student => (
          <Card 
            key ={student.time}
            name={student.name} 
            time={student.time}
          />
        ))
      }
    </div>  
  )
}

