import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_CONTATOS, GET_CONTATOS } from "./graphql";

function App() {
  const { loading, data } = useQuery(GET_CONTATOS);
  const [createContato] = useMutation(ADD_CONTATOS, {
    update(cache, { data }) {
      const newContato = data?.createContato;
      const cacheContatos = cache.readQuery({ query: GET_CONTATOS });

      cache.writeQuery({
        query: GET_CONTATOS,
        data: {
          contatos: [...cacheContatos.contatos, newContato],
        },
      });
    },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(data);

  function handleSubmit(e) {
    e.preventDefault();
    createContato({
      variables: { nome: name, email, user_id: 52014318 },
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {loading ? (
        <p>Carregando</p>
      ) : (
        <ul>
          {data.contatos.map((c, index) => (
            <li key={index}>{c.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
