import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../../services/actions/user";
import Preloader from "../../components/Preloader/Preloader";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.scss";

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, checkedAuth } = useSelector((store) => store.user);
  const [logInForm, setLogInForm] = useState({
    email: "", 
    password: "" 
});
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const onChange = (e) => {
    setLogInForm({...logInForm, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(logInForm))
  }

  useEffect(()=> {
    if(userData) {
      history.push("/");
    }
  },[history, userData]);

  useEffect(() => {
    setSubmitDisabled(!logInForm.email.trim() || !logInForm.password.trim());
  }, [logInForm])

  return checkedAuth ? (
    <div className={`${styles.login}`}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <h1 className={`${styles.login__title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          name="email"
          errorText={"Введите e-mail"}
          type="email"
          value={logInForm.email}
          onChange={onChange}
          required
        />
        <PasswordInput
          name="password"
          errorText={"Длина пароля должна быть более 5 символов"}
          min={5}
          value={logInForm.password}
          onChange={onChange}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={submitDisabled}
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
  ) : ( <Preloader /> );
};

export default Login;