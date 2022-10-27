import PropTypes from 'prop-types';
import doneImage from "../../images/done.png";
import styles from "./OrderDetails.module.scss";

const OrderDetails = ({orderData}) => {
  return (
    <div className={`${styles.container} mt-30 mb-30`}>
      <p className={`${styles.container__orderId} text text_type_digits-large mb-8`}>{orderData?.order.number}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImage} alt="Галочка." className="mt-15 mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: PropTypes.shape({
      number: PropTypes.number.isRequired
    }),
    success: PropTypes.bool.isRequired
  })
}

export default OrderDetails;