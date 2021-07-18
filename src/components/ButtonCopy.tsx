import { FiCopy } from 'react-icons/fi' 
import "../styles/buttonCopy.scss"

type ButtonCopyProps = {
  nameRoom: string;
}

export function ButtonCopy({ nameRoom }: ButtonCopyProps ){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(nameRoom)
  }

  return(
    <button className="button-copy" onClick={copyRoomCodeToClipboard}>
      <div className="icon-copy">
        <FiCopy  color="#fff" size={20} /> 
      </div>
      <span>Sala #{nameRoom}</span> 
    </button>
  )
}