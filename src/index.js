import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import apolloClient from './config/apolloClient'

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </ApolloProvider>,
  document.getElementById('root')
);