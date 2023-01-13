import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import Show from "../Show";
import { Button } from "@mantine/core";

import "./Login.scss";

const Login = () => {
  const { login, logout, loggedIn } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    login(username, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Show condition={!loggedIn}
        ifFalse={
          <Button
            onClick={logout}
            variant="gradient"
            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
          >
            Logout
          </Button>
        }
      >
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
        >
          Login
        </Button>
      </Show>
    </form>
  );
}

export default Login;
