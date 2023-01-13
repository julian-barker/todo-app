import { Link } from '@tanstack/react-router';
import { Group, Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Login from '../Auth/Login';

import './Header.scss';

const Header = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header>
      <Group position='apart' >
        <Group position="center">
          <Link to="/">Home</Link>
          <Link to="/settings">Settings</Link>
        </Group>
        <Login />
      </Group>
    </header>
  )
};

export default Header;
