import PropTypes from 'prop-types';
import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from '../../utils/data';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = ({ ingredients, selectedIngredientsIds }) => {

  const shortid = require('shortid');
  const [ingredientIds, setSelectedIds] = React.useState(selectedIngredientsIds);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const bun = ingredients.find(
    (ingredient) => ingredient._id === ingredientIds.bun
  );

  const selectedIngredients = ingredientIds.filling.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  const totalPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + bun.price * 2;

  const openModal = () => {
    setIsOrderDetailsOpened(true);
  };

  const closeModal = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
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
          <OrderDetails></OrderDetails>
        </Modal>
      )
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  selectedIngredientsIds: PropTypes.shape({
    bun: PropTypes.string,
    filling: PropTypes.arrayOf(PropTypes.string)
  })
}

export default BurgerConstructor;