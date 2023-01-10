import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
import styles from './OrderStatistics.module.scss';

const OrderStatistics = ({ allOrderData }) => {
  const { totalToday, total, orders } = allOrderData;

  const numberCreator = useCallback((number) => {
    return String(number).padStart(6, '0');
  }, []);

  const readyOrders = useMemo(() => {
    return orders.filter((order) => order.status === 'done');
  }, [orders]);

  const inProgressOrders = useMemo(() => {
    return orders.filter((order) => order.status === 'pending')
  }, [orders]);

  return (
    <section className={styles.orderStatistics}>
      <div className={styles.orderStatistics__statuses}>
        {readyOrders.length && (
          <div className={styles.orderStatistics__status}>
            <h2 className="mb-6 text text_type_main-medium">Готовы:</h2>
            <div className={styles.orderStatistics__numbersContainer}>
              <ul className={styles.orderStatistics__list}>
                {readyOrders.map(
                  (order, index) =>
                    index < 10 && (
                      <li
                        className={`text text_type_digits-default ${styles.orderStatistics__ready}`}
                        key={index}
                      >
                        {numberCreator(order.number)}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.orderStatistics__list}>
                {readyOrders.map(
                  (order, index) =>
                    index >= 10 && index < 20 && (
                      <li
                        className={`text text_type_digits-default ${styles.orderStatistics__ready}`}
                        key={index}
                      >
                        {numberCreator(order.number)}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.orderStatistics__list}>
                {readyOrders.map(
                  (order, index) =>
                    index >= 20 && index < 30 && (
                      <li
                        className={`text text_type_digits-default ${styles.orderStatistics__ready}`}
                        key={index}
                      >
                        {numberCreator(order.number)}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        )}
        {Boolean(inProgressOrders.length) && (
          <div className={styles.orderStatistics__status}>
            <h2 className="mb-6 text text_type_main-medium">В работе:</h2>
            <div className={styles.orderStatistics__numbersContainer}>
              <ul className={styles.orderStatistics__list}>
                {inProgressOrders.map((order, index) =>
                  index < 10 && (
                    <li
                      className={`text text_type_digits-default ${styles.orderStatistics__inProgress}`}
                      key={index}
                    >
                      {numberCreator(order.number)}
                    </li>
                  )
                )}
              </ul>
              <ul className={styles.orderStatistics__list}>
                {inProgressOrders.map((order, index) =>
                  index >= 10 && index < 20 && (
                    <li
                      className={`text text_type_digits-default ${styles.orderStatistics__inProgress}`}
                      key={index}
                    >
                      {numberCreator(order.number)}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={styles.orderStatistics__counter}>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={`${styles.orderStatistics__count} text text_type_digits-large`}> {total} </p>
      </div>
      <div className={styles.orderStatistics__counter}>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={`${styles.orderStatistics__count} text text_type_digits-large`}> {totalToday} </p>
      </div>

    </section>
  );
}

OrderStatistics.propTypes = {
  allOrderData: PropTypes.object.isRequired
}

export default OrderStatistics;