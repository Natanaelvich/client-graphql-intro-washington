import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_CONTATOS } from "./graphql";

const GET_USERS =  gql`
query GetUser {
  users{
    login
    token
  }
}
`
function App() {
const {loading, data } = useQuery(GET_USERS)
const [createContato] = useMutation(CREATE_CONTATOS)

const [name, setName] = useState('')
const [email, setEmail] = useState('')

function handleSubmit(e){
    e.preventDefault()
    createContato({
        variables : {name,email},
    })
}

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Nome</label>
            <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor="">Email</label>
            <input type="text" name='email' value={email} onChange={e => setEmail(e.target.value)}/>

            <button type='submit'>
cadastrar
            </button>
        </form>
        {loading ? (
        <p>Carregando</p>
        ) : (

            <ul>
          {data.users.map((u,index) =>(
              <li key={index}>{u.login}
              <button>Adicionar contato</button>
              </li>
              ))}
      </ul>
              )}
    </div>
  );
}

export default App;
