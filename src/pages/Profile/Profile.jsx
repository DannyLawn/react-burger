import { Switch } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileData from "../../components/ProfileData/ProfileData";
import inDevelopmentImg from '../../images/pageInDevelopment.png';
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../services/actions/user";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Preloader from "../../components/Preloader/Preloader";
import styles from "./Profile.module.scss";


const Profile = () => {

  const { checkedAuth } = useSelector((store) => store.user)
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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

  const handleLogOut = (e) => {
    dispatch(logOut());
  }


  return checkedAuth ? (
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
            onClick={handleLogOut}
          >
            Выход
          </Button>
        </li>
      </ul>
      <p className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}>
        {profileCaption()}
      </p>
      <Switch>
        <ProtectedRoute path="/profile" forAuthUsers exact>
          <ProfileData />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" forAuthUsers exact>
          <img className={styles.profile__inDevelopmentImg} src={inDevelopmentImg} alt="Робот разобравший себя, с надписью 'страница в разработке'." />
        </ProtectedRoute>
      </Switch>
    </main>
  ) : (<Preloader />)
};

export default Profile;