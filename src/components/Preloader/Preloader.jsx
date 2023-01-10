import loadingGif from '../../images/loading.svg';
import PropTypes from 'prop-types';
import styles from './Preloader.module.scss';

const Preloader = ({text, modalPage}) => {
  return (
    <main className={`${styles.loading} ${modalPage && styles.loading_modalPage}`}>
      <img className={styles.loading__loadingGif} src={loadingGif} alt="Загрузка" />
      <p className='text text_type_main-small'>{text}</p>
    </main>
  )
}

Preloader.defaultProps = {text: '', modalPage: false};

Preloader.propTypes = {
  text: PropTypes.string,
  modalPage: PropTypes.bool
};

export default Preloader;