import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  CHANGE_FILLING
} from '../actions/burgerConstructor';
import { ingredientTypes } from '../../utils/data';

const initialState = {
  selectedFilling: [],
  selectedBun: null
}

const bun = ingredientTypes.bun;

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_INGREDIENT:
      return action.payload.ingredient.type !== bun ? {
        ...state,
        selectedFilling: [
          ...state.selectedFilling,
          { info: action.payload.ingredient, id: action.payload.id }
        ]
      } : {
        ...state,
        selectedBun: { info: action.payload.ingredient, id: action.payload.id }
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        selectedFilling: state.selectedFilling.filter((ingredient) => ingredient.id !== action.payload.id)
      };

    case RESET_CONSTRUCTOR:
      return initialState;

    case CHANGE_FILLING:
      return {
        ...state,
        selectedFilling: action.payload
      }

    default:
      return state;
  };
};