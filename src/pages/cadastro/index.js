import { useState} from "react";
import { useHistory, Link } from "react-router-dom";
import logo from '../../assets/images/logoLogin.png';
import http from "../../services/http";

function Cadastro() {

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
   
    const history = useHistory();
  
    const manipularUsername = (ev) => setUsername(ev.target.value)
    const manipularSenha = (ev) => setSenha(ev.target.value)

    function cadastrar (ev) {
        ev.preventDefault()
      const usuario = {
          login: username,
          password: senha
      }

      http.post('user', usuario)
        .then((response) => {
              history.push("/home");
          })
    }

    return (
        <div className="main">
      <form className="boxLogin" onSubmit={cadastrar}>
          <Link to={"/"}><img src={logo} alt="Logo Login" /></Link>        
        <h3>Cadastro</h3>
        <input
          type="text"
          placeholder="Usuário"
          className="form-control py-1 px-4"
          value={username}
          onChange={manipularUsername}
        />
        <input
          type= "password"
          placeholder="Senha"
          className="form-control py-1 px-4"
          value={senha}
          onChange={manipularSenha}
        />
        <button className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
    )
}

export default Cadastro
