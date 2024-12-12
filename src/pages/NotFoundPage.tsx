import { useState } from 'react';
import NotFoundImage from '../assets/images/Not found image.jpg';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function NotFoundPage() {
  const [imageError, setImageError] = useState(false);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="not-found-card p-3">
        <Card.Body className="p-0 text-center">
          {!imageError ? (
            <Image
              src={NotFoundImage}
              alt="404 Not Found"
              fluid
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="p-3">
              <h2>404 Page Not Found</h2>
              <p>Sorry, the requested page could not be found.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
