import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {

  return (
    <div className={`${styles.login}`}>
      <form className={styles.login__form}>
        <h1 className={`${styles.login__title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          placeholder="E-mail"
          name="email"
          errorText={"Введите e-mail"}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link className={styles.login__link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link className={styles.login__link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;