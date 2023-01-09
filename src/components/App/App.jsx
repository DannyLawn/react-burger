import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/user';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../../pages/Main/Main';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Modal from '../Modal/Modal';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import ErrorMessage from '../ErrorMassage/ErrorMessage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Feed from '../../pages/Feed/Feed';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './App.module.scss';

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { errorMessage } = useSelector((state) => state.user);


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
        <Route path='/feed' exact>
          <Feed />
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
        <ProtectedRoute path="/profile" forAuthUsers exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" forAuthUsers exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:number" forAuthUsers exact>
          <OrderDetails />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          {ingredients.length && (
            <IngredientDetails ingredients={ingredients} />
          )}
        </Route>
        <Route path="/feed/:number">
          <OrderDetails />
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

      {background && (
        <Route path="/feed/:number">
          <Modal closePopup={closePopup}>
            <OrderDetails />
          </Modal>
        </Route>
      )}

      {background && (
        <Route path="/profile/orders/:number">
          <Modal closePopup={closePopup}>
            <OrderDetails />
          </Modal>
        </Route>
      )}

      {errorMessage &&
        <ErrorMessage errorMessage={errorMessage} />
      }
    </div>
  );
}

export default App;