import React from "react";

import "./UserProfile.css";

const UserProfile = () => {
  return (
    <section class="user-profile">
      <h1>Pefil do Usuário</h1>
      <br />
      <h1 class="titulo">Formulário de cadastro</h1>
      <br />
      <p>
        <img src="src/assets/imagemPerfil.png"></img>
      </p>
      <div class="formulario">
        <br />
        <form>
          <label>Primeiro Nome:</label>
          <br />
          <input type="text" size="50" name="primeironome" />
          <br />
          <label>Segundo Nome:</label>
          <br />
          <input type="text" name="segundonome" />
          <br />
          <label>CPF:</label>
          <br />
          <input type="number" name="cpf" />
          <br />
          <label>Telefone:</label>
          <br />
          <input type="number" name="segundonome" />
          <br />
          <label>Email:</label>
          <br />
          <input type="email" name="email" />
          <br />
          <label>Senha:</label>
          <br />
          <input type="password" name="senha" />
          <br />
          <label>Repetir Senha:</label>
          <br />
          <input type="password" name="repetirsenha" />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
