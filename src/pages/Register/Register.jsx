import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../services/actions/user";
import Preloader from "../../components/Preloader/Preloader";
import styles from "./Register.module.scss";

const Register = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, checkedAuth } = useSelector((store) => store.user);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const onChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(registerForm));
  }

  useEffect(() => {
    userData && history.push("/");
  },[userData, history]);

  useEffect(() => {
    setSubmitDisabled(!registerForm.email.trim() || !registerForm.password.trim() || !registerForm.name.trim());
  }, [registerForm])


  return checkedAuth ? (
    <div className={`${styles.register}`}>
      <form className={styles.register__form} onSubmit={handleSubmit} >
        <h1 className={`${styles.register__title}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={registerForm.name}
          onChange={onChange}
          required
        />
        <EmailInput
          name="email"
          errorText={"Введите e-mail"}
          type="email"
          value={registerForm.email}
          onChange={onChange}
          required
        />
        <PasswordInput
          name="password"
          errorText={"Длина пароля должна быть более 5 символов"}
          min={5}
          value={registerForm.password}
          onChange={onChange}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={submitDisabled}
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
  ) : (<Preloader/ >);
};

export default Register;