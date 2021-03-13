import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3333/',
  cache: new InMemoryCache({
      typePolicies : {
          Query : {
              fields : {
                  accounts : {
                      merge(_, incoming){
                          return incoming
                      }
                  }
              }
          }
      }
  })
});

export default client
