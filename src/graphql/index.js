import { gql } from "@apollo/client";

export const GET_CONTATOS = gql`
query {
    contatos {
        id
        nome
        email
    }
}
`
export const CREATE_CONTATOS = gql`
mutation createContato($nome : String, $email : String){
 createContato(data : {
     nome : $nome
     email : $email
 }){   
        id
        nome
        email
}
`