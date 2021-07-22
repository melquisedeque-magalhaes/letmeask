import { FormEvent, useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'

import LogoImg from '../assets/images/logo.svg'
import "../styles/room.scss"
import { ButtonCopy } from '../components/ButtonCopy'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room(){

  const params = useParams<RoomParams>()
  const roomId = params.id

  const { questions, title } = useRoom(roomId)

  const { user, signInWithGoogle } = useAuth()

  const [ newQuestion, setNewQuestion ] = useState('')

  async function handleLoginGoogle(event: FormEvent) {
    event.preventDefault()

    if(!user)
      await signInWithGoogle()
  

    if(newQuestion.trim() === ''){
      toast.error('Formulário vazio!')
      return
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlight: false,
      isAnswer: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')
    toast.success('Pergunta enviada!')
  }

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault()

    if(newQuestion.trim() === ''){
      toast.error('Formulário vazio!')
      return
    }

    if(!user){
      toast.error('Usuario não autenticado!')
      return
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlight: false,
      isAnswer: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')
    toast.success('Pergunta enviada!')
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined){
    if(likeId){
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    }else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
    
  }

  return(
    <div className="page-room">
      <header>

        <div className="content">
          <img src={LogoImg} alt="Logo Letmeask" />

          <div className="containerButton">
            <ButtonCopy nameRoom={roomId} />
          </div>
          
        </div>

      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}> 
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">

            { !user ? (
              <span>
                Para enviar uma pergunta, <button onClick={handleLoginGoogle}>faça seu login.</button>
              </span>
            ) : (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            )
            }

            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>

          {questions.map(question => (
            <Question 
              author={question.author.name}
              question={question.content} 
              avatar={question.author.avatar} 
              key={question.id} 
              isHighlighted={question.isHighlighted}
              isAnswered={question.isAnswered}
            >
              { 
                question.likeCount > 0 && !question.isAnswered &&
                <span className={question.likeId ? 'liked' : ''}>
                  {question.likeCount}
                </span> 
              }

              {!question.isAnswered && (
                <button 
                  type="button" 
                  className={question.likeId ? 'liked' : ''}
                  onClick={() => handleLikeQuestion(question.id, question.likeId)}
                >
                  <FiThumbsUp 
                    size={24} 
                    color={question.likeId ? '#845afd' : '#737380'} 
                  />
                </button>
              )}
              
            </Question>
          ))}

      </main>
      <Toaster />
    </div>
  )
}