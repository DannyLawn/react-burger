import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "../../services/actions/user";
import OrdersList from "../OrdersList/OrdersList";
import Preloader from "../Preloader/Preloader";
import { closeUserWsConnection, startUserWsConnection } from "../../services/actions/wsOrders";
import styles from './ProfileOrders.module.scss';

const ProfileOrders = () => {

  const { userData } = useSelector(store => store.user);
  const { userOrders, userConnectionError } = useSelector(store => store.wsOrders);
  const dispatch = useDispatch();
  
  const orders = useMemo(() => {
   return userOrders?.orders?.reverse()
  }, [userOrders]);

  const token = getCookie('accessToken')?.replace('Bearer ', '');

  useEffect(() => {
    userData && dispatch(startUserWsConnection(token));

    return () => dispatch(closeUserWsConnection());
  }, [dispatch, token, userData]);


  const renderContent = () => {
    if (userData && userOrders) {
      if (userOrders.orders) {
        return userOrders.orders.length ? (
          <OrdersList orders={orders} />
        ) : (<p className={`text text_type_main-small ${styles.profileOrders__message} `}>
          У нас не получилось найти ваши заказы!
        </p>)
      }
      if (userOrders.message && userOrders.message === 'Invalid or missing token') {
        dispatch(refreshToken());
      }
    } else if (userConnectionError) {
      return (
        <Preloader text='Что-то пошло не так... Обновите страницу!' />
      )
    } else {
      return (
        <Preloader />
      )
    }
  }

  return (
    <>
      {
        renderContent()
      }
    </>
  );

}

export default ProfileOrders;