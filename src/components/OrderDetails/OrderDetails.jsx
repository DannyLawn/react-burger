import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/order";
import { orderStatus } from "../../utils/data";
import styles from "./OrderDetails.module.scss";
import NotFound from "../../pages/NotFound/NotFound";

const OrderDetails = () => {

  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const { number } = useParams();

  const { publicOrders, userOrders } = useSelector(store => store.wsOrders);
  const { ingredients } = useSelector(store => store.ingredients);
  const { orderData } = useSelector(store => store.order);

  const orders = useMemo(() => {
    return publicOrders ? publicOrders.orders : userOrders ? userOrders.orders : null;
  }, [publicOrders, userOrders]);

  const order = orders?.find((order) => {
    return order.number === Number(number)
  }) || orderData;

  const orderNumber = useMemo(
    () => `#${String(order?.number).padStart(6, '0')}`,
    [order]
  );

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(number));
    }
  }, [dispatch, number, order]);

  const orderIngredients = useMemo(() => {
    return order?.ingredients?.reduce((obj, ingredientId) => {
      let ingredient = obj.ingredients.find(
        (ingredient) => ingredient._id === ingredientId
      );
      if (ingredient) {
        ingredient.count++;
      } else {
        ingredient = ingredients.find(
          (ingredient) => ingredient._id === ingredientId
        );
        obj.ingredients.push({
          count: 1,
          ...ingredient
        });
      }
      obj.totalPrice += ingredient.price;

      return obj;
    }, { ingredients: [], totalPrice: 0 })
  }, [order, ingredients]);

  return (
    <>
      {order !== 'orderNotFound' && order && (
        <div className={`${styles.orderDetails} ${!background && styles.orderDetails_fullPage} `}>
          <p className={`pt-5 pb-5 mb-5 text text_type_digits-default ${background ? styles.orderDetails__number : styles.orderDetails__number_fullPage} `}>{orderNumber}</p>
          {!background ? (<h1 className="mb-2 text text_type_main-medium">{order.name}</h1>) : (
            <div className={styles.orderDetails__titleContainer}>
              <h1 className="mb-2 text text_type_main-medium">{order.name}</h1>
            </div>
          )}
          <p className={`text text_type_main-default ${order.status === 'done' ? styles.orderDetails__doneStatus : ''}`}>{orderStatus[order.status]}</p>
          <div className={styles.ingredients}>
            <h2 className="text text_type_main-medium">Состав:</h2>
            <ul className={`${styles.ingredients__container} ${!background && styles.ingredients__container_fullPage}  `}>
              {orderIngredients.ingredients.map((ingredient, index) => {
                return (
                  <li className={styles.ingredient} key={index}>
                    <img
                      className={styles.ingredient__image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                    <p className="text text_type_main-default">
                      {ingredient.name}
                    </p>
                    <div className={styles.ingredient__priceContainer}>
                      <span className="text text_type_digits-default">{`${ingredient.count} x ${ingredient.price}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.bottomContainer}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <div className={styles.ingredient__priceContainer}>
              <span className="text text_type_digits-default">{orderIngredients.totalPrice}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
      {
        order === 'orderNotFound' && (<NotFound />)
      }

    </>
  );
};


export default OrderDetails;