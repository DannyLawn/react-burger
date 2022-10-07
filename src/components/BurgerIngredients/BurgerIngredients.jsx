import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientTypes, ingredient } from '../../utils/data';
import Ingredient from '../Ingredient/Ingredient';
import styles from '../BurgerIngredients/BurgerIngredients.module.scss';

const BurgerIngredients = (props) => {
  const main = ingredientTypes.main;
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const [current, setCurrent] = React.useState('bun');


  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === bun} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === sauce} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === main} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.burgerIngredients}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
            {
              props.ingredients.map((ingredient) =>
                ingredient.type === bun && <Ingredient
                  name={ingredient.name}
                  image={ingredient.image}
                  price={ingredient.price}
                  key={ingredient._id}
                />
              )
            }
          </ul>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
            {
              props.ingredients.map((ingredient) =>
                ingredient.type === sauce && <Ingredient
                  name={ingredient.name}
                  image={ingredient.image}
                  price={ingredient.price}
                  key={ingredient._id}
                />
              )
            }
          </ul>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
            {
              props.ingredients.map((ingredient) =>
                ingredient.type === main && <Ingredient
                  name={ingredient.name}
                  image={ingredient.image}
                  price={ingredient.price}
                  key={ingredient._id}
                />
              )
            }
          </ul>
        </div>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired
}

export default BurgerIngredients;