import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { hideError } from '../../services/actions/user';
import ReactDOM from "react-dom";
import { defaultInfoErrorMessage, infoErrorMessages } from '../../utils/data';
import styles from './ErrorMessage.module.scss';

const errMessageContainer = document.querySelector('#errorMessage');

const ErrorMessage = ({ errorMessage }) => {

  const dispatch = useDispatch();

  const textMessage = useMemo(() => {
    return (
      infoErrorMessages.find((message) => message.serverMessage === errorMessage)?.message || defaultInfoErrorMessage
    );
  }, [errorMessage]);

  useEffect(() => {
    const hideTimer = setTimeout(() => dispatch(hideError()), 6000);
    return () => {
      clearTimeout(hideTimer);
    };
  }, [dispatch]);

  return ReactDOM.createPortal(errorMessage && (
    <div className={styles.errorMessage}>
      <p className={styles.errorMessage__text}>{`${textMessage}!`}</p>
    </div>),
    errMessageContainer
  )

}

export default ErrorMessage

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired
};