import { FiCopy } from 'react-icons/fi' 
import LogoImg from '../assets/images/logo.svg'

export function Room(){
  return(
    <div className="page-room">
      <header>
        <img src={LogoImg} alt="Logo Letmeask" />

        <div><FiCopy  color="#fff" size={16} /> Sala #323243</div>
      </header>
    </div>
  )
}