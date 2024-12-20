import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleComplete = async () => {
    await logout();
    navigate('/');
  };

  return (
    <LoadingScreen
      message="Signing out..."
      color="#c96fb7"
      onComplete={handleComplete}
    />
  );
};

export default LogoutPage;
