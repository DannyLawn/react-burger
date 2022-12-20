import { Switch, Route } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileData from "../../components/ProfileData/ProfileData";
import inDevelopmentImg from '../../images/pageInDevelopment.png';
import styles from "./Profile.module.scss";


const Profile = () => {

  const { pathname } = useLocation();

  const profileCaption = () => {
    switch (pathname) {
      case '/profile':
        return 'В этом разделе вы можете изменить свои персональные данные';
      case '/profile/orders':
        return 'В этом разделе вы можете просмотреть свою историю заказов'
      default:
        return '';
    }
  };


  return (
    <main className={styles.profile}>
      <ul className={styles.profile__nav}>
        <li>
          <NavLink
            to="/profile"
            className={`${styles.profile__link} text text_type_main-medium`}
            activeClassName={`${styles.profile__link_active} text text_type_main-medium`}
            exact
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            className={`${styles.profile__link} text text_type_main-medium`}
            activeClassName={`${styles.profile__link_active} text text_type_main-medium`}
            exact
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <Button
            htmlType="button"
            type="secondary"
            extraClass={`${styles.profile__link} text text_type_main-medium`}
          >
            Выход
          </Button>
        </li>
      </ul>
      <p className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}>
        {profileCaption()}
      </p>
      <Switch>
        <Route path="/profile" exact>
          <ProfileData />
        </Route>
        <Route path="/profile/orders" exact>
          <img className={styles.profile__inDevelopmentImg} src={inDevelopmentImg} alt="Робот разобравший себя, с надписью 'страница в разработке'." />
        </Route>
      </Switch>
    </main>
  )
};

export default Profile;