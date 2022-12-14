import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation} from "react-router-dom";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {

  const { pathname } = useLocation();

  return (
    <header className={`${styles.header} pt-4 pb-4 pr-4 pl-4`}>
      <div className={styles.header__container}>
        <ul className={styles.header__nav}>
          <li className="pt-4 pr-5 pb-4 mr-2">
            <NavLink  to="/" className={styles.header__link} activeClassName={styles.header__link_active} exact>
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </NavLink>
          </li>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink to="/feed" className={styles.header__link} activeClassName={styles.header__link_active} exact>
              <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <NavLink to="/profile" className={styles.header__link} activeClassName={styles.header__link_active}>
          <ProfileIcon type={pathname.startsWith('/profile') ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;