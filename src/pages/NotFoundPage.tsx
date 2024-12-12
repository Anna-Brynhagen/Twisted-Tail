import { Card, Container, Image } from 'react-bootstrap';
import NotFoundImage from '../assets/images/Not found image.jpg';

function NotFoundPage() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="not-found-card p-3">
        <Card.Body className="p-0">
          <Image src={NotFoundImage} alt="404 Not Found" fluid />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
