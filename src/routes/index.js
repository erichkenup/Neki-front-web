import Login from '../pages/login'
import Home from '../pages/home'
import Cadastro from '../pages/cadastro'
import PrivateRoute from './PrivateRoute';
import { BrowserRouter, Route, Switch } from "react-router-dom";
function index() {
    return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/cadastro" component={Cadastro} />
          <PrivateRoute exact path="/home" component={Home} />
          {/* <Route
            exact
            path="/cadastrar-usuario"
            component={CadastrarUsuario}
          /> */}
        </Switch>
        </BrowserRouter>
    )
}

export default index
