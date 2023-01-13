import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import Show from '../Show';

const Auth = ({capability, children}) => {
  const { loggedIn, can } = useContext(AuthContext);
  const show = loggedIn && (capability ? can(capability) : true);

  return (
    <Show
      condition={show}
      ifTrue={children}
    />
  );
}

export default Auth;
