import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider');
  }

  return authContext;
};

export default useAuth;
