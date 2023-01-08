import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { orderStatus } from "../../utils/data";
import {
  Counter,
  FormattedDate,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Order.module.scss";
import { useSelector } from "react-redux";

const Order = ({ order, forUser }) => {

  const location = useLocation();
  const { path } = useRouteMatch();
  const { ingredients, name, number, status, createdAt } = order;
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);

  const selectedIngredients = useMemo(() => {

    const ingredientsList = ingredients.map((ingredient) =>
      ingredientsData.find((ingredientData) => ingredientData._id === ingredient));

    const ingredientsCount = ingredientsList.reduce((array, ingredient) => {
      let current = array.find((arrayIngredient) => arrayIngredient._id === ingredient._id);

      if (current) {
        current.count++;
      } else {
        let current = {
          count: 1,
          ...ingredient
        }
        array.push(current);
      }
      return array;
    }, []);

    return ingredientsCount;
  }, [ingredients, ingredientsData]);

  const totalPrice = useMemo(() =>
    selectedIngredients.reduce((acc, ingredient) => (acc += ingredient.price * ingredient.count), 0),
    [selectedIngredients]);

  const hiddenIngredientCount = useMemo(() => (
    selectedIngredients.length > 5 ? selectedIngredients.length - 5 : null
  ), [selectedIngredients]);

  const orderNumber = useMemo(
    () => `#${String(number).padStart(6, '0')}`,
    [number]
  );

  return (
    <li>
      <Link
        className={styles.order}
        to={{
          pathname: `${path}/${number}`,
          state: { background: location },
        }}
      >
        <div className={styles.order__container}>
          <p className="text text_type_digits-default">{orderNumber}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h3 className="text text_type_main-medium mt-6">{name}</h3>
        {forUser && (
          <span
            className={`text text_type_main-small mt-2 ${status === "done" ? styles.order__doneStatus : null}`}
          >
            {orderStatus[status]}
          </span>
        )}
        <div className={`${styles.order__container} mt-6`}>
          <ul className={styles.order__imageList}>
            {selectedIngredients.map((ingredient, index) => {
              if (index < 6) {
                return (
                  <li
                    className={styles.order__imageContainer}
                    key={index}
                    style={{ zIndex: 6 - index }}
                  >
                    <img
                      className={styles.order__image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                    {ingredient.count > 1 && index < 5 && (
                      <Counter
                        count={ingredient.count}
                        size="small"
                        extraClass={styles.order__counter}
                      />
                    )}
                    {index === 5 && (
                      <>
                        <div className={styles.order__imageOverlay}></div>
                        <span
                          className={`${styles.order__hiddenIngredients} text text_type_main-small`}
                        >{`+${hiddenIngredientCount}`}</span>
                      </>
                    )}
                  </li>
                );
              }
            })}
          </ul>
          <div className={styles.order__container}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  forUser: PropTypes.bool
}


export default Order;