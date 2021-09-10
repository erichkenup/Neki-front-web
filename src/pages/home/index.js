import http from "../../services/http";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../components/modal";
import "./style.css";

function Home() {
  let nome = localStorage.getItem("userName");
  const [skills, setSkills] = useState([]);
  const [isModalEditarVisible, setIsModalEditarVisible] = useState(false);
  const [isModalCriarVisible, setIsModalCriarVisible] = useState(false);
  const [level, setLevel] = useState();
  const [nomeSkill, setNomeSkill] = useState();
  const [descricao, setDescricao] = useState();
 
  const [url, setUrl] = useState();
  const history = useHistory();

  useEffect(() => {
    http.get(`userSkill/?login=${nome}`).then((response) => {
      const { data } = response;
      setSkills(data);
    });
  }, []);

  function logout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  function salvarCriar() {
     setIsModalCriarVisible(false);
    const novaSkill = {
        name: nomeSkill,
        version: 1,
        description: descricao,
        imageUrl: url
      };
      http.post("skill", novaSkill).then((response) => {
          http.get(`skill/${nomeSkill}`).then((response)=>{
              let idUser = localStorage.getItem("id")
              const novaAssossiacao = {
              userId: idUser,
              skillId: response.data.id,
              knowledgeLevel: level
          }
        http.post(`userSkill`, novaAssossiacao).then((response) => {
            atualizarPagina()
        });
          })
      })
      
  }

  function atualizarPagina() {
    http.get(`userSkill/?login=${nome}`).then((response) => {
      const { data } = response;
      setSkills(data);
    });
  }
  function desassociar(skill) {
    let novaSkill = skills.filter((elemento) => elemento.id == skill.id);
    let novasSkills = skills.filter(
      (elemento) => novaSkill[0].id != elemento.id
    );
    setSkills(novasSkills);

    http.delete(`userSkill/${skill.id}`).then((response) => {});
  }

  function salvarEditar(skill) {
    setIsModalEditarVisible(false)
    if (level <= 10 && level >= 1) {
      const assossiacao = {
        userId: skill.user.id,
        skillId: skill.skill.id,
        knowledgeLevel: level,
      };
      http.put(`userSkill/${skill.id}`, assossiacao).then((response) => {
          atualizarPagina()
      });
    }
  }

  return (
    <div className="container">
      <h1>Bem vindo {nome}</h1>
      <h3>Skills</h3>
      <button onClick={() => setIsModalCriarVisible(true)}>Criar</button>
      <button onClick={logout} className="logout">
        Logout
      </button>
      <div className="containerCard">
        {skills.map((skill) => {
          return (
            <div key={skill.id} className="card">
              <img src={skill.skill.imageUrl} className="imgContainer" />
              <p>nome {skill.skill.name}</p>
              <p>versão {skill.skill.version}</p>
              <p>descrição {skill.skill.description}</p>
              <p>Level {skill.knowledgeLevel}</p>
              <p>Criado em {skill.createdAt}</p>
              <p>Atualizado em {skill.updatedAt}</p>
              <div className="buttons">
                <button onClick={() => setIsModalEditarVisible(true)}>
                  {" "}
                  Editar
                </button>

                <button onClick={() => desassociar(skill)}> Desassociar</button>
              </div>
              {isModalEditarVisible ? (
                <Modal onClose={() => setIsModalEditarVisible(false)}>
                  {
                    <div>
                      <input
                        type="text"
                        placeholder="level"
                        className="form-control py-1 px-4"
                        onChange={(value) => setLevel(value.target.value)}
                      />
                      <button onClick={() => salvarEditar(skill)}> salvar</button>
                    </div>
                  }
                </Modal>
              ) : null}
            </div>
          );
        })}
      </div>
      {isModalCriarVisible ? (
                <Modal onClose={() => setIsModalCriarVisible(false)}>
                  {
                    <div className="criar">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="form-control py-1 px-4"
                      onChange={(value) => setNomeSkill(value.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      className="form-control py-1 px-4"
                      onChange={(value) => setDescricao(value.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="imageUrl"
                      className="form-control py-1 px-4"
                      onChange={(value) => setUrl(value.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="level"
                      className="form-control py-1 px-4"
                      onChange={(value) => setLevel(value.target.value)}
                    />
                    <button onClick={() => salvarCriar()}>Salvar</button>
                  </div>
                  }
                </Modal>
              ) : null}
    </div>
  );
}

export default Home;
