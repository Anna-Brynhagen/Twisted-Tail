import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { SignupData } from '../types/User.types';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FirebaseError } from '@firebase/util';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSignup: SubmitHandler<SignupData> = async (data) => {
    try {
      await signup(data.email, data.password);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Sign Up</Card.Title>
              <SignupForm handleSignup={onSignup} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
