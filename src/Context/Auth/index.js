import { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import base64 from 'base-64';

export const AuthContext = createContext({});

// const testUsers = {
//   admin: {
//     username: 'admin',
//     password: 'ADMIN',
//     email: 'admin@fakeuser.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM',
//   },
//   editor: {
//     username: 'editor',
//     password: 'EDITOR',
//     email: 'editor@fakeuser.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU',
//   },
//   user: {
//     username: 'user',
//     password: 'USER',
//     email: 'user@fakeuser.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH',
//   },
// };

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  function can(capability) {
    return user?.capabilities?.includes(capability);
  }

  function _validateToken(token) {
    try {
      const user = jwtDecode(token);
      setUser(user);
      setLoggedIn(true);
      console.log('logged in');
      return true;
    } catch (e) {
      setError(e);
      console.error(e);
      return false;
    }
  }

  async function login(username, password) {
    console.log('running login', username, password);
    const response = await fetch('https://api-js401.herokuapp.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(`${username}:${password}`),
      },
    });
    console.log('🚀 ~ file: index.js:56 ~ login ~ response', response);
    try {
      const data = await response.json();
      console.log('data', data);
      _validateToken(data.token);
    } catch (e) {
      setError(e);
      console.error(e);
    }
  }

  function logout() {
    setUser({});
    setLoggedIn(false);
    console.log('logged out');
  }

  const values = {
    user,
    loggedIn,
    error,
    login,
    logout,
    can,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
