import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/user';
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
import ErrorMessage from '../ErrorMassage/ErrorMessage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './App.module.scss';

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { userData, errorMessage } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(getUserData());
    dispatch(getIngredients());
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
            alt="Робот собирающий себя, с подписью 'страница в разработке'." />
        </Route>
        <ProtectedRoute path="/register" forAuthUsers={false}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path="/login" forAuthUsers={false}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" forAuthUsers={false}>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" forAuthUsers={false}>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" forAuthUsers>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          {ingredients.length && (
            <IngredientDetails ingredients={ingredients} />
          )}
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

      {errorMessage &&
        <ErrorMessage errorMessage={errorMessage} />
      }
    </div>
  );
}

export default App;