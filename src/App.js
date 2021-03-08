import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import apolloClient from './config/apolloClient'

function App() {
const [users, setUsers] = useState([])

    useEffect(() => {
        apolloClient
  .query({
    query: gql`
      query GetUser {
        users{
          login
        }
      }
    `
  })
  .then(result => {
      setUsers(result.data.users)
  })
    }, [])
  return (
    <div className="App">
      <ul>
          {users.map(u =>(
              <li>{u.login}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
