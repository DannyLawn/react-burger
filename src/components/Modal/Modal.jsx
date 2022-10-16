import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from './Modal.module.scss';


const modalsContainer = document.querySelector('#modals');

const Modal = ({ closePopup, children }) => {

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closePopup();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);


  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        {children}
        <button type="button"
          className={styles.modal__closeButton}
          onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay onClick={closePopup} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;