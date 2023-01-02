import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useRef } from "react";
import { upgradeUser } from "../../services/actions/user";
import styles from "./ProfileData.module.scss";

const ProfileData = () => {

  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const { userData, checkedAuth } = useSelector((store) => store.user);
  const initialEditFormState = {
    name: userData?.name,
    email: userData?.email,
    password: ""
  }
  const [editForm, setEditForm] = useState( initialEditFormState );

  const onChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const isValidChanges = useMemo(() =>
    userData && (userData.name !== editForm.name || userData.email !== editForm.email || editForm.password.length),
    [userData, editForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(upgradeUser(editForm));
  }

  const resetChanges = () => {
    setEditForm(initialEditFormState);
  }

  return checkedAuth && (
    <form className={styles.profileData} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        ref={nameRef}
        icon={"EditIcon"}
        errorText={"Введите имя"}
        value={editForm.name}
        onChange={onChange}
        onIconClick={() => nameRef.current.focus()}

      />
      <EmailInput
        type="email"
        placeholder="E-mail"
        name="email"
        icon={"EditIcon"}
        errorText={"Введите e-mail"}
        value={editForm.email}
        onChange={onChange}
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        icon={"EditIcon"}
        errorText={"Длина пароля должны быть более 5 символов"}
        min={5}
        value={editForm.password}
        onChange={onChange}
      />
      {isValidChanges ?
        (<div className={styles.profileData__buttonContainer}>
          <Button
            htmlType="reset"
            type="secondary"
            size="medium"
            onClick={resetChanges}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>) : null}
    </form>
  );
};

export default ProfileData;