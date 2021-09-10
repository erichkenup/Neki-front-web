import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const  autenticado  = localStorage.getItem("token")?true:false;

  return (
    <Route
      {...rest}
      render={(props) =>
        autenticado ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;