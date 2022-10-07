import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Ingredient.module.scss';

const Ingredient = (props) => {
  return (
    <>
      <li className={styles.ingredient}>
        <img className={`${styles.ingredient__image} mr-4 ml-4`} src={props.image} alt={props.alt} />
        <div className={`${styles.ingredient__price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredient__name} text text_type_main-default`}>{props.name}</p>
        <Counter count={1} size="default" />
      </li>
    </>
  );
}

export default Ingredient;