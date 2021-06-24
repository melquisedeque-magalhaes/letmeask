import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg' 
import logoImg from '../assets/images/logo.svg'

import "../styles/newRoom.scss"


export function NewRoom(){

  // const { user, signInWithGoogle } = useAuth()

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

          <form>
            <input 
              type="text"
              placeholder="Nome da sala" 
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