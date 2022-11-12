import { nanoid } from "nanoid";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
export const CHANGE_FILLING = 'CHANGE_FILLING';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: { ingredient: ingredient, id: nanoid(6) }
});

export const deleteIngredient = (ingredient) => ({
  type: DELETE_INGREDIENT,
  payload: ingredient
});

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR
});

export const changeFilling = (fillings, dragIndex, hoverIndex) => {
  const dragFilling = fillings[dragIndex];
  fillings.splice(dragIndex, 1);
  fillings.splice(hoverIndex, 0, dragFilling);

  return {
    type: CHANGE_FILLING,
    payload: [...fillings]
  };
};