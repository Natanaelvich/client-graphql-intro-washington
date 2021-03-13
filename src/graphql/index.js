import { gql } from "@apollo/client";

export const GET_CONTATOS = gql`
  query {
    contatos {
      email
      nome
    }
  }
`;
export const GET_ACCOUNTS = gql`
  query {
    accounts {
      _id
      nome
      email
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
export const ADD_ACCOUNT = gql`
  mutation createAccount($nome: String!, $email: String!) {
    createAccount(data: { nome: $nome, email: $email }) {
      nome
      email
    }
  }
`;
export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: ID!) {
    deleteAccount(id: $id)
  }
`;
export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($id: ID!, $email: String!, $nome: String!) {
    updateAccount(id: $id, data: { email: $email, nome: $nome }) {
      nome
      email
      _id
    }
  }
`;
