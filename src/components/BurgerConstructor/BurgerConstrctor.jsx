import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredient } from '../../utils/data';
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = (props) => {
  return (
    <>
      <section className={`${styles.burgerConstrctor} pt-25 pr-4 pl-4`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).name + ' (верх)'}
              price={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).price}
              thumbnail={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).image}
            />
          </div>
          <ul className={styles.burgerConstructor__list}>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b9"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b9"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b9"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b4"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b4"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b4"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bc"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bc"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bc"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9bb"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9ba"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9ba"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9ba"
                  ).image}
              />
            </li>
            <li className={styles.burgerConstructor__item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b3"
                  ).name}
                price={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b3"
                  ).price}
                thumbnail={
                  props.ingredients.find((ingredient) =>
                    ingredient._id === "60666c42cc7b410027a1a9b3"
                  ).image}
              />
            </li>
          </ul>
          <div className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).name + ' (низ)'}
              price={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).price}
              thumbnail={
                props.ingredients.find((ingredient) =>
                  ingredient._id === "60666c42cc7b410027a1a9b1"
                ).image}
            />
          </div>
        </div>
        <div className={`${styles.burgerConstructor__arrangeContainer} mt-10 pr-4`}>
          <div className={`${styles.burgerConstructor__totalPrice} mr-10`}>
            <p className="text text_type_digits-medium mr-2">4284</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired
}

export default BurgerConstructor;