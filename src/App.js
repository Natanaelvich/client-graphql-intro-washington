import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ADD_ACCOUNT,
  GET_ACCOUNTS,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
} from "./graphql";

const cacheCreateAccount = {
  update(cache, { data }) {
    const newAccount = data?.createAccount;
    const cacheAccounts = cache.readQuery({ query: GET_ACCOUNTS });

    cache.writeQuery({
      query: GET_ACCOUNTS,
      data: {
        accounts: [...cacheAccounts.accounts, newAccount],
      },
    });
  },
};

function App() {
  const { loading, data } = useQuery(GET_ACCOUNTS);
  const [createAccount] = useMutation(ADD_ACCOUNT, cacheCreateAccount);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    createAccount({
      variables: { nome: name, email },
    });
  }

  function handleUpdate(id) {
    updateAccount({
      variables: { id, nome: name, email },
    });
  }

  function handleDeleteAccount(id) {
    deleteAccount({
      variables: { id },
      refetchQueries: [{ query: GET_ACCOUNTS }],
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
          {data.accounts.map((c) => (
            <div key={`account-${c._id}`}>
              <li>
                {c._id} : {c.nome} : {c.email}
                <button onClick={() => handleDeleteAccount(c._id)}>
                  remove
                </button>
                <button onClick={() => handleUpdate(c._id)}>update</button>
              </li>
            </div>
          ))}
        </ul>
      )}

      <label htmlFor="">Nome Atualizar</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">Email Atualizar</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default App;
