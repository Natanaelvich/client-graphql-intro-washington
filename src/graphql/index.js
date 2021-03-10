import { gql } from "@apollo/client";

export const GET_CONTATOS = gql`
  query {
    contatos {
      email
      nome
    }
  }
`;
export const ADD_CONTATOS = gql`
  mutation createContato($nome: String!, $email: String!, $user_id: Int!) {
    createContato(data: { nome: $nome, email: $email, user_id: $user_id }) {
      nome
      email
    }
  }
`;
