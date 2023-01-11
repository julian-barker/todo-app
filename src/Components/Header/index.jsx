import { Link } from '@tanstack/react-router';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/settings">Settings</Link>
    </header>
  )
};

export default Header;
