import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {

  return (
    <div className={`${styles.resetPassword}`}>
      <form className={styles.resetPassword__form}>
        <h1 className={`${styles.resetPassword__title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          errorText={"Введите код из письма"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
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