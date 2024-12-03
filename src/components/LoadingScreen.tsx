import { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface LoadingScreenProps {
  message?: string;
  color?: string;
  minimumDelay?: number;
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  color = '#4d0011',
  minimumDelay = 1000,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, minimumDelay);

    return () => clearTimeout(timer);
  }, [minimumDelay, onComplete]);

  if (!isVisible) return null;

  return (
    <Container className="mt-4 center-y">
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Card className="shadow authCard">
            <Card.Body>
              <Card.Title className="text-center">{message}</Card.Title>
              <div className="spinner-container mt-4 mb-4">
                <PropagateLoader color={color} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingScreen;
