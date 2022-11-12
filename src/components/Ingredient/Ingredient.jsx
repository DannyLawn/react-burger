import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { ingredientTypes } from '../../utils/data';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Ingredient.module.scss';

const Ingredient = ({ ingredient, onIngredientClick }) => {

  const { selectedFilling, selectedBun } = useSelector(store => store.burgerConstructor);
  const bun = ingredientTypes.bun;

  const [{ isHover }, dragRef] = useDrag({
    type: "ingredients",
    item: { ...ingredient },
    collect: (monitor) => ({
      isHover: monitor.isDragging()
    }),
  });


  const countIngredient = useMemo(() => {
    if (ingredient.type !== bun) {
      const sameIngredients = selectedFilling?.filter(
        (topping) => topping.info._id === ingredient._id
      );
      return sameIngredients?.length;
    }
    return selectedBun?.info._id === ingredient._id ? 2 : 0;

  }, [selectedFilling, selectedBun]);



  return (
    <li className={`${styles.ingredient} ${ isHover ? styles.isHover : ''}`} onClick={onIngredientClick} ref={dragRef}>
      <img className={`${styles.ingredient__img} mr-4 ml-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.ingredient__price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredient__name} text text_type_main-default`}>{ingredient.name}</p>
      {countIngredient > 0 && <Counter count={countIngredient} size="default" />}
    </li>
  );

};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onIngredientClick: PropTypes.func.isRequired
};

export default Ingredient;