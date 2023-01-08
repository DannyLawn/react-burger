import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-hook-inview';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientTypes } from '../../utils/data';
import Ingredient from '../Ingredient/Ingredient';
import styles from './BurgerIngredients.module.scss';

const BurgerIngredients = () => {

  const { ingredients } = useSelector(store => store.ingredients);

  const main = ingredientTypes.main;
  const bun = ingredientTypes.bun;
  const sauce = ingredientTypes.sauce;

  const bunTitleRef = React.useRef(null);
  const sauceTitleRef = React.useRef(null);
  const mainTitleRef = React.useRef(null);

  const [current, setCurrent] = React.useState(bun);

  const [bunRef, inViewBun] = useInView({
    threshold: 0.4,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.4,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0.4,
  });

  const scrollToBun = () => {
    const offsetPosition = bunTitleRef.current.getBoundingClientRect().top - bunTitleRef.current.parentNode.offsetTop;
    bunTitleRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(bun);
  }

  const scrollToSauce = () => {
    const offsetPosition = sauceTitleRef.current.getBoundingClientRect().top - sauceTitleRef.current.parentNode.offsetTop;
    sauceTitleRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(sauce);
  }

  const scrollToMain = () => {
    const offsetPosition = mainTitleRef.current.getBoundingClientRect().top - mainTitleRef.current.parentNode.offsetTop;
    mainTitleRef.current.parentNode.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setCurrent(main);
  }

  useEffect(() => {
    if (inViewBun) {
      setCurrent(bun);
    } else if (inViewSauce) {
      setCurrent(sauce);
    } else if (inViewMain) {
      setCurrent(main);
    }
  }, [inViewBun, inViewMain, inViewSauce, bun, main, sauce]);


  return (
    <section>
      <h1 className={`${styles.burgerIngredients__title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
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
        <h2 className="text text_type_main-medium pt-10 mb-6" id={bun} ref={bunTitleRef}>Булки</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`} ref={bunRef} >
          {
            ingredients?.map((ingredient) =>
              ingredient.type === bun && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                />
              )
            )
          }
        </ul>
        <h2 className="text text_type_main-medium pt-10 mb-6" id={sauce} ref={sauceTitleRef}>Соусы</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`} ref={sauceRef}>
          {
            ingredients?.map((ingredient) =>
              ingredient.type === sauce && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                />
              )
            )
          }
        </ul>
        <h2 className="text text_type_main-medium pt-10 mb-6" id={main} ref={mainTitleRef}>Начинки</h2>
        <ul className={`${styles.ingredientsSet} mt-6 mb-6 pl-4`} ref={mainRef}>
          {
            ingredients?.map((ingredient) =>
              ingredient.type === main && (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                />
              )
            )
          }
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;