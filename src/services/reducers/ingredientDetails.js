import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from '../actions/ingredientDetails';

const initialState = {
  viewedIngredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS:
      return {
        ...state,
        viewedIngredient: action.payload
      };

    case CLOSE_INGREDIENT_DETAILS:
      return initialState;

    default:
      return state;
  };
}