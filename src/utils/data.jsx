import PropTypes from 'prop-types';


const URL = 'https://norma.nomoreparties.space/api';


const ingredientTypes = {
  main: 'main',
  bun: 'bun',
  sauce: 'sauce'
}


const ingredientPropType = PropTypes.shape(
  {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }
);


const selectedIngredientsIds = {
  bun: "60d3b41abdacab0026a733c6",
  filling: [
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733d2",
    "60d3b41abdacab0026a733d3",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733ca",
  ]
}


export { URL, ingredientTypes, ingredientPropType, selectedIngredientsIds };