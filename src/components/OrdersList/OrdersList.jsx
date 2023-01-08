import PropTypes from 'prop-types';
import Order from '../Order/Order';
import { useRouteMatch } from 'react-router-dom';
import { useMemo } from 'react';
import styles from './OrdersList.module.scss';

const OrdersList = ({ orders }) => {

  const { path } = useRouteMatch();
  const forUser = useMemo(() => path.startsWith('/profile'), [path]);

  return (
    <ul className={styles.ordersList}>
      {orders.map((order, index) =>
        (<Order order={order} key={index} forUser={forUser} />)
      )
      }
    </ul>
  );
}

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired
}

export default OrdersList;