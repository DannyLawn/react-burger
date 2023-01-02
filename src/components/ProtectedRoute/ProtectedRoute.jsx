import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, forAuthUsers, ...rest }) => {

  const { userData } = useSelector((store) => store.user);
  const location = useLocation();
 
  if (userData && !forAuthUsers) {
    const { from } = location.state || { from: { pathname: '/' } }
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    )
  }

  return (
    <Route
      {...rest}
      render={ () =>
        (!userData && forAuthUsers) ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />)
          : (children)
      }
    />
  )
}

export default ProtectedRoute;