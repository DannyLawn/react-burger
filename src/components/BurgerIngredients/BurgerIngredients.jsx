import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientTypes, ingredientPropType } from '../../utils/data';
import Ingredient from '../Ingredient/Ingredient';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { IngredientsContext } from '../../context/IngredientsContext';
import styles from './BurgerIngredients.module.scss';

const BurgerIngredients = ({ selectedIngredientsIds }) => {

  const { ingredients } = useContext(IngredientsContext);
  const main = ingredientTypes.main;
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;
  const [current, setCurrent] = React.useState(bun);
  const [ingredientInfo, setIngredeintInfo] = React.useState(null);
  const [ingredientInfoOpened, setIngredientInfoOpened] = React.useState(false);
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);


  const scrollToBun = () => {
    const offsetPosition = bunRef.current.getBoundingClientRect().top - bunRef.current.parentNode.offsetTop;
    bunRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(bun);
  }

  const scrollToSauce = () => {
    const offsetPosition = sauceRef.current.getBoundingClientRect().top - sauceRef.current.parentNode.offsetTop;
    sauceRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(sauce);
  }

  const scrollToMain = () => {
    const offsetPosition = mainRef.current.getBoundingClientRect().top - mainRef.current.parentNode.offsetTop;
    mainRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(main);
  }

  const openPopup = (ingredient) => {
    setIngredeintInfo(ingredient);
    setIngredientInfoOpened(true);
  };

  const closePopup = () => {
    setIngredientInfoOpened(false);
    setIngredeintInfo(null);
  };

  const countIngredient = (ingredient) => {
    if (ingredient.type !== bun) {
      const sameIngredients = selectedIngredientsIds.filling.filter(
        (id) => id === ingredient._id
      );
      return sameIngredients.length;
    }
    return selectedIngredientsIds.bunId === ingredient._id ? 2 : 0;
  };

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.burgerIngredients__menu}>
        <Tab value="bun" active={current === bun} onClick={scrollToBun}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === sauce} onClick={scrollToSauce}>
          Соусы
        </Tab>
        <Tab value="main" active={current === main} onClick={scrollToMain}>
          Начинки
        </Tab>
      </div>
      <div className={styles.burgerIngredients}>
        <h2 className="text text_type_main-medium pt-10 mb-6" ref={bunRef}>Булки</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
          {
            ingredients?.map((ingredient) =>
              ingredient.type === bun && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={countIngredient(ingredient)}
                  onIngredientClick={() => openPopup(ingredient)}
                />
              )
            )
          }
        </ul>
        <h2 className="text text_type_main-medium pt-10 mb-6" ref={sauceRef}>Соусы</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
          {
            ingredients?.map((ingredient) =>
              ingredient.type === sauce && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={countIngredient(ingredient)}
                  onIngredientClick={() => openPopup(ingredient)}
                />
              )
            )
          }
        </ul>
        <h2 className="text text_type_main-medium pt-10 mb-6" ref={mainRef}>Начинки</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`}>
          {
            ingredients?.map((ingredient) =>
              ingredient.type === main && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={countIngredient(ingredient)}
                  onIngredientClick={() => openPopup(ingredient)}
                />
              )
            )
          }
        </ul>
      </div>
      {ingredientInfoOpened && (
        <Modal closePopup={closePopup}>
          <IngredientDetails ingredient={ingredientInfo} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  selectedIngredientsIds: PropTypes.shape({
    bun: PropTypes.string,
    filling: PropTypes.arrayOf(PropTypes.string)
  })
};

export default BurgerIngredients;