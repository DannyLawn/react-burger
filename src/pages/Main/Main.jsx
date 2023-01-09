import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstrctor';
import Preloader from '../../components/Preloader/Preloader';
import styles from './Main.module.scss';

const Main = () => {

  const { ingredientsRequest, ingredientsFailed } = useSelector((store) => store.ingredients);

  return (
    <>
      {ingredientsFailed && (
        <>
          <p className={`text text_type_main-default ${styles.main__errorMassage}`}>Что-то пошло не так...</p>
          <p className={`text text_type_main-default ${styles.main__errorMassage}`}>Попробуйте обновить страницу или приходите позже.</p>
        </>
      )}
      {(!ingredientsRequest && !ingredientsFailed) ? (
        <main className={styles.main__content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : (
        <Preloader fullPage />
      )}
    </>
  )
}

export default Main;