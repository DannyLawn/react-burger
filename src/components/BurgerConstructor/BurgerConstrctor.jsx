import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { addIngredient, deleteIngredient, resetConstructor } from '../../services/actions/burgerConstructor';
import { postOrder, closeOrder } from '../../services/actions/order';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from "./BurgerConstructor.module.scss";
import Filling from '../Filling/Filling';
import { useHistory } from 'react-router-dom';
import { showError } from '../../services/actions/user';

const BurgerConstructor = () => {

  const { selectedFilling, selectedBun } = useSelector(store => store.burgerConstructor);
  const { isOrderDetailsOpened } = useSelector(store => store.order);
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.user);
  const history = useHistory();

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const countPrice = useMemo(() => {
    const bunPrice = selectedBun ? selectedBun.info.price * 2 : 0;
    const totalPrice = selectedFilling.reduce((sum, ingredient) => sum += ingredient.info.price, bunPrice);
    return totalPrice;
  }, [selectedFilling, selectedBun]);

  const orderListIds = React.useMemo(() => (
    {
      'ingredients': [
        selectedBun?.info._id,
        ...selectedFilling?.map((ingredient) => ingredient.info._id),
        selectedBun?.info._id
      ]
    }), [selectedFilling, selectedBun]);

  const makeAnOrder = () => {
    if (userData) {
      dispatch(postOrder(orderListIds));
    } else {
      dispatch(showError("unauthorized order"));
      history.push('/login');
    }
  };

  const closeOrderDetails = () => {
    dispatch(closeOrder());
    dispatch(resetConstructor());
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeOrderDetails();
  };

  const handleRemoveIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  }

  const renderFilling = useMemo(() =>
    selectedFilling.map((ingredient, index) => (
      <Filling
        ingredient={ingredient}
        key={ingredient.id}
        index={index}
        handleRemoveIngredient={handleRemoveIngredient}
      />
    )),
    [selectedFilling]
  );


  return (
    <section className={`${styles.burgerConstructor} mt-25 pr-4 pl-4 
    ${canDrop & !isHover && styles.dropActive} ${isHover && styles.dropHover}`} ref={dropTarget}>

      <div className={styles.burgerConstructor__container}>

        {selectedBun ? (
          <div className={`${styles.burgerConstructor__bunItem} ml-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectedBun?.info.name} (верх)`}
              price={selectedBun?.info.price}
              thumbnail={selectedBun?.info.image}
            />
          </div>
        ) : (<p className={`text text_type_main-default ${styles.addIngredientMassage}`}>Выберите БУЛКУ</p>)}

        {selectedFilling.length ? (
          <ul className={styles.burgerConstructor__list}>
            {renderFilling}
          </ul>
        ) : (<p className={`text text_type_main-default ${`${styles.addIngredientMassage} ${styles.addIngredientMassage_secondMassage}`}`}>Выберите НАЧИНКУ</p>)}

        {selectedBun && (
          <div className={`${styles.burgerConstructor__bunItem} ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun?.info.name} (низ)`}
              price={selectedBun?.info.price}
              thumbnail={selectedBun?.info.image}
            />
          </div>
        )}
      </div>

      <div className={`${styles.burgerConstructor__arrangeContainer} mt-10 pr-4`}>
        <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{countPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" disabled={!selectedFilling.length || !selectedBun} onClick={makeAnOrder}>
          Оформить заказ
        </Button>
      </div>

      {isOrderDetailsOpened && (
        <Modal closePopup={closeOrderDetails} onEscKeydown={handleEscKeydown}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;