import doneImage from "../../images/done.png";
import loadingGif from '../../images/loading.svg';
import styles from "./OrderDetails.module.scss";
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";

const OrderDetails = () => {

  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const { number } = useParams();

  const { publicOrders, userOrders } = useSelector(store => store.wsOrders);
  const { orderNumber, orderRequest, orderFailed } = useSelector(store => store.order);
  const { ingredients } = useSelector(store => store.ingredients);

  const orders = useMemo(() => {
   return publicOrders ? publicOrders.orders : userOrders ? userOrders.orders : null;
  }, [publicOrders, userOrders]);




  return (
    <div className={`${styles.orderContainer} mt-30 mb-30`}>
      {orderFailed && (
        <>
          <p className={`text text_type_main-default ${styles.orderContainer__errorMassage}`}>Что-то пошло не так...</p>
          <p className={`text text_type_main-default ${styles.orderContainer__errorMassage}`}>Попробуйте повторить заказ.</p>
        </>
      )}
      {!orderRequest && !orderFailed ? (
        <>
          <p className={`${styles.orederContainer__orderId} text text_type_digits-large mb-8`}>{orderNumber}</p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={doneImage} alt="Галочка." className="mt-15 mb-15" />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (<img className={styles.loadingImg} src={loadingGif} alt="Загрузка..." />)}
    </div>
  );
};


export default OrderDetails;