import Modal from 'react-modal'
import { FiXCircle } from 'react-icons/fi'
import "../styles/modalEndRoom.scss"

type ModalEndRoomProps = {
    modalIsOpen: boolean;
    setIsOpen: (condition: boolean) => void; 
    handleEndRoom: () => void;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        width: '590px',
        heigth: '362px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
  };

export function ModalEndRoom({ modalIsOpen, setIsOpen, handleEndRoom }: ModalEndRoomProps){

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            contentLabel="Example Modal"
            style={customStyles}
            onRequestClose={closeModal}
        >
           <div>
                <div className="container-modal">
                    <FiXCircle size={50} color="#E73F5D" />
                    <h1>Encerrar sala</h1>
                    <p>Tem certeza que você deseja encerrar esta sala?</p>
                    <div className="container-button">
                        <button className="cancel" onClick={closeModal}>Cancelar</button>
                        <button className="end-room" onClick={handleEndRoom}>Sim, encerrar</button>
                    </div>
                </div>
           </div>
      </Modal>
    )
}