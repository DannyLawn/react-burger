import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { ingredientPropType } from '../../utils/data';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeFilling } from '../../services/actions/burgerConstructor';
import styles from './Filling.module.scss';

const Filling = ({ ingredient, index, handleRemoveIngredient }) => {

  const { selectedFilling } = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = ingredient.id;

  const [{ handlerId, dragedIngredient }, drop] = useDrop({
    accept: "burgerConstructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        dragedIngredient: monitor.getItem(),
      };
    },
    hover(item, monitor) {

      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(changeFilling(selectedFilling, dragIndex, hoverIndex));
     

      item.index = hoverIndex;
    },
  });


  const [, drag] = useDrag({
    type: "burgerConstructor",
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  const opacity = !dragedIngredient ? 1 : dragedIngredient.id === id ? 0.5 : 1;

  return (
    <li className={styles.filling} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.info.name}
        price={ingredient.info.price}
        thumbnail={ingredient.info.image}
        handleClose={() => handleRemoveIngredient(ingredient)}
      />
    </li>
  );
}

Filling.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    info: ingredientPropType
   }),
  index: PropTypes.number.isRequired,
  handleRemoveIngredient: PropTypes.func.isRequired
};



export default Filling;