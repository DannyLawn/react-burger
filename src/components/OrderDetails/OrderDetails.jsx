import PropTypes from 'prop-types';
import doneImage from "../../images/done.png";
import loadingGif from '../../images/loading.svg';
import styles from "./OrderDetails.module.scss";
import { useSelector } from 'react-redux';

const OrderDetails = () => {

  const { orderNumber, orderRequest, orderFailed, } = useSelector(store => store.order);

  return (
    <div className={`${styles.orderContainer} mt-30 mb-30`}>
      {Boolean(orderFailed) && (
        <>
          <p className={`text text_type_main-default ${styles.orderContainer__errorMassage}`}>Что-то пошло не так...</p>
          <p className={`text text_type_main-default ${styles.orderContainer__errorMassage}`}>Попробуйте повторить заказ.</p>
        </>
      )}
      {Boolean(!orderRequest && !orderFailed) ? (
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