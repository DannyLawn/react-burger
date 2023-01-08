import loadingGif from '../../images/loading.svg';
import PropTypes from 'prop-types';
import styles from './Preloader.module.scss';

const Preloader = ({text}) => {
  return (
    <main className={styles.loading}>
      <img className={styles.loading__loadingGif} src={loadingGif} alt="Загрузка..." />
      <p className='text text_type_main-small'>{text}</p>
    </main>
  )
}

Preloader.defaultProps = {text: ''};

Preloader.propTypes = {
  text: PropTypes.string
};

export default Preloader;