import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import '../styles/button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: IconType | string | JSX.Element;
}

export function Button({ children, ...rest }:ButtonProps){
  return(
    <button  
      className="button"
      {...rest}
    >
      {children}
    </button>
  )
}