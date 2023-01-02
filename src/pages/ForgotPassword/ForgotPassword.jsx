import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import { forgotPassword } from "../../services/actions/user";

import styles from "./ForgotPassword.module.scss";


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
const [forgotPassForm, setForgotPassForm] = useState({
  "email": ""
});
const [submitDisabled, setSubmitDisabled] = useState(false);

const { forgotPassSuccess, checkedAuth } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(forgotPassForm));
  }

  const onChange = (e) => {
    setForgotPassForm({
      ...forgotPassForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    forgotPassSuccess && history.push('/reset-password');
  }, [forgotPassSuccess, history]);

  useEffect(() => {
    setSubmitDisabled(!forgotPassForm.email.trim());
  }, [forgotPassForm]);

  return checkedAuth ? (
    <div className={`${styles.forgotPassword}`}>
      <form className={styles.forgotPassword__form} onSubmit={handleSubmit}>
        <h1 className={`${styles.forgotPassword__title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder="Укажите e-mail"
          name="email"
          type="email"
          errorText={"Введите e-mail"}
          onChange={onChange}
          value={forgotPassForm.email}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={submitDisabled}
        >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link className={styles.forgotPassword__link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  ) : ( <Preloader />);
};

export default ForgotPassword;