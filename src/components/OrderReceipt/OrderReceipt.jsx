import doneImage from "../../images/done.png";
import Preloader from "../Preloader/Preloader";
import { useSelector } from 'react-redux';
import styles from "./OrderReceipt.module.scss";

const OrderReceipt = () => {

  const { orderNumber, orderRequest, orderFailed, } = useSelector(store => store.order);

  return (
    <div className={`${styles.orderContainer} mt-30 mb-30`}>
      {
        orderFailed ? (
          <Preloader text="Что-то пошло не так... попробуйте повторить заказ" modalPage />
        ) : (!orderRequest) ? (
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
        ) : (<Preloader text="Создание заказа" modalPage />)
      }

    </div>
  );
};


export default OrderReceipt;