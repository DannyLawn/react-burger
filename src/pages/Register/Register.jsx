import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {


  return (
    <div className={`${styles.register}`}>
      <form className={styles.register__form} >
        <h1 className={`${styles.register__title}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link className={styles.register__link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;