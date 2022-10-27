import PropTypes from 'prop-types';
import React, { useContext, useReducer} from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsApi } from '../../utils/API';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { IngredientsContext } from '../../context/IngredientsContext';
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = ({ selectedIngredientsIds }) => {

  const { ingredients } = useContext(IngredientsContext);
  const shortid = require('shortid');
  const [ingredientIds, setSelectedIds] = React.useState(selectedIngredientsIds);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [orderData, setOrderData] = React.useState(null);


  const bun = ingredients.find(
    (ingredient) => ingredient._id === ingredientIds.bun
  );

  const selectedIngredients = ingredientIds.filling.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  const orderIds = { "ingredients": [
    bun._id,
    ...selectedIngredients.map((ing) => ing._id),
    bun._id
  ]};
 
  const handlePlaceAnOrder = () => {
    const getOrderData = () => {
      ingredientsApi.getOrder(orderIds)
        .then((res) => {
          setOrderData(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
    getOrderData();
  };


  // const totalPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + bun.price * 2;

  // Подсчет стоимости начинки через reducer
  const costInitialState = { count: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + action.payment };
      case "decrement":
        return { count: state.count - action.payment };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  const [costOfFilling, costOfFillingDispatcher] = useReducer(reducer, costInitialState);

  React.useEffect( () => {
    selectedIngredients.forEach(elem => costOfFillingDispatcher({type: "increment", payment: elem.price}));
  }, []);

  const totalPrice = costOfFilling.count + bun.price * 2;

  

  const openModal = () => {
    handlePlaceAnOrder();
    setIsOrderDetailsOpened(true);
  };

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
    setOrderData(null);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
    setOrderData(null);
  };

  return (
    <section className={`${styles.burgerConstrctor} pt-25 pr-4 pl-4`}>
      <div className={styles.burgerConstructor__container}>
        <div className="ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={styles.burgerConstructor__list}>
          {
            selectedIngredients.map((ingredient) => {
              return (
                <li className={styles.burgerConstructor__item} key={shortid.generate()}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              )
            })
          }
        </ul>
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={`${styles.burgerConstructor__arrangeContainer} mt-10 pr-4`}>
        <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal closePopup={closeModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails orderData={orderData} />
        </Modal>
      )
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredientsIds: PropTypes.shape({
    bun: PropTypes.string,
    filling: PropTypes.arrayOf(PropTypes.string)
  })
}

export default BurgerConstructor;