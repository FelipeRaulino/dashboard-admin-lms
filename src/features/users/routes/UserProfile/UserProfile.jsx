import React from "react";

import "./UserProfile.css";

const UserProfile = () => {
  return (
    <section class="formulario">
      <h1>Pefil do Usuário</h1>
      <br />
      <h1 class="titulo">Formulário de Interesses:</h1>
      <br />
      <form>
        <label for="nome">Nome:</label>
        <br />
        <input class="input" type="text" id="nome" name="nome" />
        <br />

        <label for="email">Email:</label>
        <br />
        <input class="input" type="email" id="email" name="email" />
        <br />

        <label for="regiao">Prefência por regiao de compra:</label>
        <select id="regiao" name="regioes">
          <option value="Norte">Norte</option>
          <option value="Nordeste">Nordeste</option>
          <option value="Sul">Sul</option>
          <option value="Centro-Oeste">Centro-Oeste</option>
          <option value="Sudeste">Sudeste</option>
        </select>

        <label>Escolha categoria de interesse:</label>
        <br />
        <div class="checkbox-group">
          <label for="eletronicos">
            <input
              type="checkbox"
              id="eletronicos"
              name="interesses"
              value="eletronicos"
            />
            Eletrônicos
          </label>

          <label for="calcados">
            <input
              type="checkbox"
              id="calcados"
              name="interesses"
              value="calcados"
            />
            Calçados
          </label>

          <label for="livros">
            <input
              type="checkbox"
              id="livros"
              name="interesses"
              value="livros"
            />
            Livros
          </label>

          <label for="vestimentas">
            <input
              type="checkbox"
              id="vestimentas"
              name="interesses"
              value="vestimentas"
            />
            Vestimentas
          </label>
        </div>
        <br />

        <p>Preferência de produtos específicos:</p>
        <input class="input" type="text" id="preferencia" name="preferencia" />
        <br />

        <p>Preferência de forma de pagamento:</p>
        <div class="radio-group">
          <label for="pix">
            <input type="radio" id="pix" name="pagamento" value="pix" />
            Pix
          </label>

          <label for="cartao">
            <input type="radio" id="cartao" name="pagamento" value="cartao" />
            Cartão
          </label>
          <label for="boleto">
            <input type="radio" id="boleto" name="pagamento" value="boleto" />
            Boleto
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default UserProfile;
