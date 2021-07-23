import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '../components/Button'

import { FiLogIn } from 'react-icons/fi'

import illustrationImg from '../assets/images/illustration.svg' 
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import "../styles/home.scss"
// import { database } from '../services/firebase'
import { useEffect } from 'react';

export function Home(){

  useEffect(() => {
    console.log("variavel ambiente: ", process.env.REACT_APP_API_KEY)
  },[])

  const history = useHistory()

  // const { user, signInWithGoogle } = useAuth()

  const [ roomCode, setRoomCode ] = useState('')

  // async function handleCreateRoom(){

  //   if(!user){
  //     await signInWithGoogle()
  //   }
    
  //   history.push('/rooms/new')

  // }

  // async function handleJoinRoom(event: FormEvent){
  //   event.preventDefault()

  //   if(roomCode.trim() === ''){
  //     toast.error('Erro Formulario vazio!')
  //     return
  //   }
      
  //   const roomRef = await database.ref(`rooms/${roomCode}`).get()

  //   if(!roomRef.exists()){
  //     toast.error('Room does not exists')
  //     return
  //   }

  //   if(roomRef.val().endedAt){
  //     toast.error('Room already closed.')
  //     return
  //   }
      
  //   toast.success('Seja bem vindo')
  //   history.push(`room/${roomCode}`)

  // }

  return(
    <div id="container">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">

          <img src={logoImg} alt="Logo Letmeask" />

          <button 
            className="create-room" 
            // onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={() => {}}>
            <input 
              type="text"
              placeholder="Digite o código da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">
              <>
                <FiLogIn size={16} color="#ffffff" />
                Entrar na sala
              </>
            </Button>
          </form>

        </div>
      </main>

      <Toaster />
    </div>
  )
}