import {
  Input,
  EmailInput,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfileData.module.scss";

const ProfileData = () => {

  return (
    <form className={styles.profileData}>
      <Input
        type="text"
        placeholder="Имя"
        name="name" 
        icon={"EditIcon"}
        errorText={"Введите имя"}
      />
      <EmailInput
        placeholder="E-mail"
        name="email"
        icon={"EditIcon"}
        errorText={"Введите e-mail"}
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        icon={"EditIcon"}
        errorText={"Длина пароля должны быть более 5 символов"}
      />
    </form>
  );
};

export default ProfileData;