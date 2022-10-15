import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from './Modal.module.scss';


const modalsContainer = document.querySelector('#modals');

const Modal = ({ closePopup, onEscKeydown, children }) => {

  React.useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
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
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;