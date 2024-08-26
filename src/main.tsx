import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'
const httpLink=createHttpLink({
  uri:"http://localhost:4000"
})
const authLink = setContext((_:any) => {

  const token = localStorage.getItem('token');
  return {
    headers: {
      authorization: token ?  JSON.parse(token) : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
