import { ReactNode } from 'react'

import "../styles/question.scss"

type QuestionProps = {
  question: string;
  avatar: string;
  author: string;
  children?: ReactNode;
}

export function Question({ question, avatar, author, children }: QuestionProps){
  return(
    <div className="container">

      <p>{question}</p>

      <div className="question-footer">

        <div className="avatar">
          <img 
            src={avatar} 
            alt="Avatar" 
          /> 
          <span>{author}</span>
        </div>
        
        <div className="buttonsContainer">
          {children}
        </div>
      </div>
    </div>
  )
}