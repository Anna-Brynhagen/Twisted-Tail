import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage: React.FC = () => {
  return (
    <Container className="mt-4 center-y">
      <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Card className="shadow mb-4">
            <Card.Body className="text-center">
              <h1 className="h1-title mb-4">Twisted Snake</h1>
              <p className="game-description mb-2">The goal is simple:</p>
              <p className="game-description mb-3">
                Eat the food, <br /> grow your snake, <br /> and survive as long
                as possible.
              </p>
              <p className="game-rules mt-4">
                But beware! <br /> If you crash into the walls or <br /> collide
                with yourself...
              </p>
              <h2 className="game-over-text">
                YOU'RE <span className="dead-text">DEAD</span>
              </h2>
            </Card.Body>
          </Card>
          <Card className="shadow mb-4">
            <Card.Body className="text-center">
              <h3 className="h3-title mb-4">Move with these keys:</h3>
              <p className="game-description">
                Want to show off your highscore?
              </p>
              <a href="/signup">Simply create an account.</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
