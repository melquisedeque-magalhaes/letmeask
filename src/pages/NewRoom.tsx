import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg' 
import logoImg from '../assets/images/logo.svg'

import { database } from '../services/firebase'

import "../styles/newRoom.scss"


export function NewRoom(){

  const { user } = useAuth()

  const [ newRoom, setNewRoom ] = useState('')

  const history = useHistory()

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    if(newRoom.trim() === '')
      return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/room/${firebaseRoom.key}`)
  }

  return(
    <div className="container">

      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">

          <img src={logoImg} alt="Logo Letmeask" />

          <strong>Crie uma nova sala</strong>

          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">
              Criar sala
            </Button>
          </form>

          <span>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></span>

        </div>
      </main>

    </div>
  )
}