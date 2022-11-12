import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/ingredients';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstrctor';
import loadingGif from '../../images/loading.svg';
import styles from './App.module.scss';


const App = () => {

  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(
      getIngredients()
    )
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <AppHeader />
      {ingredientsFailed && (
        <>
          <p className={`text text_type_main-default ${styles.page__errorMassage}`}>Что-то пошло не так...</p>
          <p className={`text text_type_main-default ${styles.page__errorMassage}`}>Попробуйте обновить страницу или приходите позже.</p>
        </>
      )}
      {(!ingredientsRequest && !ingredientsFailed) ? (
        <main className={styles.page__content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : (
        <main className={styles.page__loadingContainer}><img className={styles.page__loadingImg} src={loadingGif} alt="Загрузка..." /></main>
      )}
    </div>
  );
}

export default App;