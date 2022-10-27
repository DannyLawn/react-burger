import React from 'react';
import { ingredientsApi } from '../../utils/API';
import { selectedIngredientsIds } from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstrctor';
import { IngredientsContext } from '../../context/IngredientsContext';
import loadingGif from '../../images/loading.gif';
import styles from './App.module.scss';


const App = () => {

  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const getIngredients = () => {
      ingredientsApi.getIngredients()
        .then((res) => {
          setIngredients(res.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
    getIngredients();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      {ingredients.length ? (
        <main className={styles.page__content}>
          <BurgerIngredients ingredients={ingredients} selectedIngredientsIds={selectedIngredientsIds} />
          <IngredientsContext.Provider value={{ingredients, setIngredients}}>
            <BurgerConstructor selectedIngredientsIds={selectedIngredientsIds} />
          </IngredientsContext.Provider>
        </main>
      ) : (
        <main className={styles.page__loadingContainer}><img className={styles.page__loadingImg} src={loadingGif} alt="Загрузка..." /></main>
      )}
    </div>
  );
}

export default App;