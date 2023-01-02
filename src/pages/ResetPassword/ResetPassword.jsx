import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPassSuccess, forgotPassSuccess } = useSelector((store) => store.user);
  const [ resetPasswordForm, setResetPasswordForm ] = useState({
    "password": "",
    "token": ""
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const onChange = (e) => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(resetPasswordForm));
  }

  useEffect(() => {
    !forgotPassSuccess && history.push('/forgot-password')
    resetPassSuccess && history.push('/login')
    
      }, [forgotPassSuccess, resetPassSuccess, history]);


  useEffect(() => {
    setSubmitDisabled(!resetPasswordForm.password.trim() || !resetPasswordForm.token.trim());
  }, [resetPasswordForm]);


  return (
    <div className={`${styles.resetPassword}`}>
      <form className={styles.resetPassword__form} onSubmit={handleSubmit}>
        <h1 className={`${styles.resetPassword__title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={resetPasswordForm.password}
          errorText={"Длина пароля должна быть более 5 символов"}
          onChange={onChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          value={resetPasswordForm.token}
          errorText={"Введите код из письма"}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={submitDisabled}
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link className={styles.resetPassword__link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;