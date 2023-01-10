import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect } from 'react';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderStatistics from '../../components/OrderStatistics/OrderStatistics';
import Preloader from '../../components/Preloader/Preloader';
import { startPublicWsConnection, closePublicWsConnection } from '../../services/actions/wsOrders';
import styles from './Feed.module.scss';

const Feed = () => {
  const dispatch = useDispatch();
  const { publicOrders, publicConnectionError } = useSelector(store => store.wsOrders);

  const ordersData = useMemo(() => {
    return publicOrders?.orders
  }, [publicOrders]);

  useEffect(() => {
    dispatch(startPublicWsConnection());

    return () => dispatch(closePublicWsConnection());
  }, [dispatch]);

  return publicOrders ? (
    <main className={styles.feed}>
      <section>
        <h1 className={`${styles.feed__title} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        <OrdersList orders={ordersData} />
      </section>
      <OrderStatistics allOrderData={publicOrders} />
    </main>
  ) : publicConnectionError ? (
    <div className={styles.feed__preloaderContainer}>
      <Preloader text='Что-то пошло не так... Обновите страницу!' />
    </div>
  ) : (<Preloader fullPage />);
}


export default Feed;