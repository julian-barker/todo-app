import { Link } from '@tanstack/react-router';
import { Group, Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Show from '../Show';

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
        <Link to="/login">
          <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
            {loggedIn ? 'Logout' : 'Login'};
          </Button>
        </Link>
      </Group>
    </header>
  )
};

export default Header;
