import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../../pages/Main/Main';
import inDevelopmentImg from '../../images/pageInDevelopment.png';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './App.module.scss';

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const ingredients = useSelector((state) => state.ingredients.ingredients);


  useEffect(() => {
    dispatch(
      getIngredients()
    )
  }, [dispatch]);

  const closePopup = () => {
    history.goBack();
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path='/feed'>
          <img className={styles.profile__inDevelopmentImg} src={inDevelopmentImg}
            alt="Робот разобравший себя, с надписью 'страница в разработке'." />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          {ingredients.length && (
            <Modal closePopup={closePopup}>
              <IngredientDetails ingredients={ingredients} />
            </Modal>
          )}
        </Route>)}
    </div>
  );
}

export default App;