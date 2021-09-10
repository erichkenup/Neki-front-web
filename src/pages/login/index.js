import React from 'react'
import { useState} from "react";
import { useHistory, Link } from "react-router-dom";
import MensagemErro from "./MensagemErro";
import logo from '../../assets/images/logoLogin.png';
import http from "../../services/http";
import "./style.css"

function Login() {

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoSenha, setTipoSenha] = useState("password");
    const [checked, setChecked] = React.useState(false);
 
    const handleChange = () => {
      if(checked === true){
        setTipoSenha("password")
      }else setTipoSenha("text")
    setChecked(!checked);
    
    };
  
    const history = useHistory();
  
    const manipularUsername = (ev) => setUsername(ev.target.value)
    const manipularSenha = (ev) => setSenha(ev.target.value)
  
    const logar = (ev) => {
      ev.preventDefault()
      const usuario = {
          login: username,
          password: senha
      }
  
       http.post('login', usuario)
        .then((response) => {
              const { token, usuario } = response.data
              localStorage.setItem("id", response.data.userEntity.id);
              localStorage.setItem("token", token);
              console.log(token)
              localStorage.setItem(
                  "userName", response.data.userEntity.login
              );
              history.push("/home");
          })
          .catch(error => { 
              console.error(error)
              setMensagem("Usuário ou senha incorretos");
              setTimeout(() => {
                  setMensagem("");
              }, 4000);
          })
    } 

    return (
        <div className="main">
      <form className="boxLogin" onSubmit={logar}>
        <img src={logo} alt="Logo Login" />
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Usuário"
          className="form-control py-1 px-4 input"
          value={username}
          onChange={manipularUsername}
        />
        <input        
          type= {tipoSenha}
          placeholder="Senha"
          className="form-control py-1 px-4 input"
          value={senha}
          onChange={manipularSenha}
        />

        {mensagem && <MensagemErro msg={mensagem} />}
        <button className="btn btn-primary">Logar</button>
        <div className="inline2">
          <input type="checkbox"
          checked={checked}
          onChange={handleChange}/>
        <p>Mostrar senha</p>
        </div>
        
      <Link className="noDecoration" to={"/cadastro" }>Cadastro</Link>
      </form>
    </div>
    )
}

export default Login
