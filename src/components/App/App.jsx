import React from 'react';
import { data } from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstrctor';
import styles from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: data
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.page__content}>
          <BurgerIngredients ingredients={this.state.ingredients} />
          <BurgerConstructor ingredients={this.state.ingredients} />
        </main>
      </div>
    );
  }
}

export default App;