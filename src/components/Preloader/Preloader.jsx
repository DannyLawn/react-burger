import loadingGif from '../../images/loading.svg';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <main className={styles.loading}>
      <img className={styles.loading__loadingGif} src={loadingGif} alt="Загрузка..." />
    </main>
  )
}

export default Preloader;