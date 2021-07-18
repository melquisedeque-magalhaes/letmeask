import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: IconType | string | JSX.Element;
  isOutlined?: boolean;
}

export function Button({ children, isOutlined = false, ...rest }:ButtonProps){
  return(
    <button  
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...rest}
    >
      {children}
    </button>
  )
}