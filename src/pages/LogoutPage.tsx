import { PropagateLoader } from 'react-spinners';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useAuth from '../hooks/useAuth';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      await logout();
      setTimeout(() => navigate('/'), 2000);
    };
    logoutUser();
  }, [logout, navigate]);

  return (
    <>
      <Container className="mt-4 center-y">
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Card className="shadow authCard">
              <Card.Body>
                <Card.Title className="logout-title text-center">
                  Signing out
                </Card.Title>
                <div className="spinner-container mt-4 mb-4">
                  <PropagateLoader color="#4d0011" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogoutPage;
