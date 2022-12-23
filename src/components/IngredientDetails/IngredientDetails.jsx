import { useEffect, useMemo, useRef} from "react";
import { useParams, useLocation } from "react-router-dom";
import { ingredientsPropType } from '../../utils/data';
import NotFound from "../../pages/NotFound/NotFound";
import styles from "./IngredientDetails.module.scss";

const IngredientDetails = ({ ingredients }) => {
 
  const { id } = useParams();
  const location = useLocation();
  const titleRef = useRef(null);

  const changeTitleAlign = () => {
    titleRef.current.classList.add(styles.title__fullScreen)
  }

  useEffect(() => {
    !location.state && (
      changeTitleAlign()
    )
  }, []);

  const ingredient = useMemo(
    () => ingredients?.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  return ingredient ? (
    <div className={`${styles.container} mt-15 mb-15 ml-10 mr-10`}>
      <h2 className={`${styles.title} text text_type_main-large mb-3`} ref={titleRef}>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={styles.nutrients}>
        <li className={styles.nutrients__item}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={styles.nutrients__item}>
          <span className="text text_type_main-default">Белки, г</span>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={styles.nutrients__item}>
          <span className="text text_type_main-default">Жиры, г</span>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={styles.nutrients__item}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  ) : ( <NotFound />);
};

IngredientDetails.propTypes = [
  ingredientsPropType
];

export default IngredientDetails;