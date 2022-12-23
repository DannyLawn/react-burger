import PropTypes from 'prop-types';

const URL = 'https://norma.nomoreparties.space/api';

const ingredientTypes = {
  main: 'main',
  bun: 'bun',
  sauce: 'sauce'
}

const ingredientsPropType = PropTypes.shape(
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

const infoErrorMessages = [
  {
    serverMessage: "email or password are incorrect",
    message: "Неверная почта или пароль"
  },
  {
    serverMessage: "User already exists",
    message: "Пользователь уже существует",
  },
  {
    serverMessage: "User with such email already exists",
    message: "Пользователь с такой почтой уже существует",
  },
  {
    serverMessage: "Unauthorized user",
    message: "Авторизуйтесь для оформления заказа",
  },
  {
    serverMessage: "Incorrect reset token",
    message: "Неправильный код",
  },
  {
    serverMessage: "User data changes",
    message: "Данные изменены",
  },
  {
    serverMessage: "Password changed",
    message: "Пароль изменен",
  }
];

const defaultInfoErrorMessage = "Что-то пошло не так... Попробуйте повторить позже";

export { URL, ingredientTypes, ingredientsPropType, defaultInfoErrorMessage, infoErrorMessages };