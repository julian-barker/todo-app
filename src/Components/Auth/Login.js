import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import Show from "../Show";
import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

const Login = () => {
  const { login, logout, loggedIn } = useContext(AuthContext);
  console.log('🚀 ~ file: login.js:8 ~ Login ~ loggedIn', loggedIn);
  console.log('🚀 ~ file: login.js:8 ~ Login ~ logout', logout);
  console.log('🚀 ~ file: login.js:8 ~ Login ~ login', login);

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    login(username, password);
  }

  return (
    <>
      <Show condition={!loggedIn}
        ifTrue={
          <>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
              <Button type="submit">
                Login
              </Button>
            </form>
            {/* <Link to="/"> */}
            {/* </Link> */}
          </>
        }
        ifFalse={
          <>
            <Button onClick={logout}>
              Logout
            </Button>
          </>
        }
      ></Show>
    </>
  );
}

export default Login;
