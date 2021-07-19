import { ReactNode } from 'react'
import cx from 'classnames'

import "../styles/question.scss"

type QuestionProps = {
  question: string;
  avatar: string;
  author: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ 
  question, 
  avatar, 
  author, 
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps){
  return(
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >

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