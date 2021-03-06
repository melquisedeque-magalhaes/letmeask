import { FiCheckCircle, FiMessageSquare, FiTrash } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button'

import LogoImg from '../assets/images/logo.svg'
import "../styles/room.scss"
import { ButtonCopy } from '../components/ButtonCopy'

import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase'
import { ModalEndRoom } from '../components/ModalEndRoom'
import { useState } from 'react'

type RoomParams = {
  id: string;
}

export function AdminRoom(){

  const [modalIsOpen, setIsOpen] = useState(false);

  const params = useParams<RoomParams>()
  const roomId = params.id

  const history = useHistory()

  const { questions, title } = useRoom(roomId)

  async function handleEndRoom(){

    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function openModal() {
    setIsOpen(true)
  }

  async function handleDeleteQuestion(questionId: string) {

    const response = window.confirm("Deseja mesmo excluir essa pergunta ? ")

    if(response)
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  
    return;
    
  }

  async function handleCheckQuestionAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return(
    <div className="page-room">
      <header>

        <div className="content">
          <img src={LogoImg} alt="Logo Letmeask" />

          <div className="buttons-header">
            <ButtonCopy nameRoom={roomId} />
            <Button 
              isOutlined 
              onClick={openModal}
            >
              Encerrar Sala
            </Button>
          </div>
          
        </div>

      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="questions">
          {questions.map(question => (
            <Question 
              author={question.author.name}
              question={question.content} 
              avatar={question.author.avatar} 
              key={question.id} 
              isHighlighted={question.isHighlighted}
              isAnswered={question.isAnswered}
            >
              {!question.isAnswered && (
                <>
                    <button type="button">
                    <FiCheckCircle 
                      size={20} 
                      color={`${question.isHighlighted && !question.isAnswered ? "#835afd": "#737380"}` }
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    />
                  </button>
                  <button type="button">
                    <FiMessageSquare 
                      size={20} 
                      color="#737380"
                      onClick={() => handleHighlightQuestion(question.id)}
                    />
                  </button>
                </>
              )}
              <button 
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <FiTrash 
                  size={20} 
                  color="#737380" 
                />
              </button>
            </Question>
          ))}
        </div>

      </main>
      <ModalEndRoom modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} handleEndRoom={handleEndRoom} />
    </div>
  )
}