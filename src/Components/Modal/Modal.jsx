import styles from './Modal.module.scss'
import "../../App.scss";
import {FaTimes} from "react-icons/fa";

const Modal = ({isOpen, children, onClose, header}) => {
    if (!isOpen) return null;

    return (
    <div aria-label="modal" className={styles.modal_overlay} onClick={onClose}>
        <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
                <h2>{header}</h2>
                <button className="close_button" onClick={onClose}><FaTimes/></button>
            </div>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    </div>

    )
}

export default Modal