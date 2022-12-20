import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {


  return (
    <div className={`${styles.forgotPassword}`}>
      <form className={styles.forgotPassword__form}>
        <h1 className={`${styles.forgotPassword__title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder="Укажите e-mail"
          name="email"
          errorText={"Введите e-mail"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
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
  )
};

export default ForgotPassword;