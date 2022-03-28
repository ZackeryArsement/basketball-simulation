import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import classes from './App.module.css'
import Navbar from './components/navbar/Navbar';

import HomePage from './pages/HomePage';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import Marketplace from './pages/Marketplace';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const token = localStorage.getItem("id_token")

function App() {

    return (
      <div>
        {!token ? (
          <ApolloProvider client={client}>
            <Router>
              <Routes>
                {/* If the user is not logged in then bring them to the login/signup page */}
                <Route
                path="/"
                element={<LoginSignup />}>
                </Route>
              </Routes>
            </Router>
          </ApolloProvider>

          ): (
          <ApolloProvider client={client}>
            <Router>
              <main>
                <Navbar />
                
                <Routes>
                  
                  {/* Homepage Route */}
                  <Route 
                  path="/"
                  element={<HomePage />}
                  />

                  {/* Profile Route */}
                  <Route 
                  path="/profile"
                  element={<Profile />}
                  />

                  {/* Marketplace Route */}
                  <Route 
                  path="/marketplace"
                  element={<Marketplace />}
                  />
                </Routes>
              </main>
            </Router>
          </ApolloProvider>
        )}  
      </div>
    );
  }
  
  export default App;