import notFoundImg from '../../images/pageNotFound.png';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useCallback } from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const history = useHistory();

  const goToMain = useCallback(
    () => history.replace({ pathname: "/" }),
    [history]
  );

  return (
    <div className={styles.notFound}>
      <img src={notFoundImg} className={styles.notFound__mainImage} alt="Робот разобравший себя, с надписью 'страница не найдена'." />
      <Button htmlType="button" type="primary" size="medium" onClick={goToMain}>
        Вернуться на главную
      </Button>
    </div>
  );
}

export default NotFound;