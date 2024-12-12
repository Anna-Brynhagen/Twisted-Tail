import { Container, Row, Col, Card } from 'react-bootstrap';
import ArrowKeysCanvas from '../components/ArrowKeysCanvas';

const HomePage = () => {
  return (
    <Container className="homePage-container center-y">
      <Row className="mb-4">
        <Col xs={{ span: 12, offset: 0 }}>
          <Card className="shadow">
            <Card.Body className="text-center">
              <h1 className="h1-title mb-4">Twisted Snake</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <Card className="shadow h-100">
            <Card.Body className="text-center">
              <h3 className="h3-title mb-2">The goal is simple:</h3>
              <p className="game-description mb-3">
                Eat the food <br />
                Grow your snake <br />
                Survive as long as possible
              </p>
              <p className="game-rules mt-4">
                But beware! <br />
                If you crash into the walls or <br />
                collide with yourself...
              </p>
              <h2 className="game-over-text">
                YOU'RE <span className="dead-text">DEAD</span>
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6} className="mb-4">
          <Card className="shadow h-100">
            <Card.Body className="text-center">
              <h3 className="h3-title">Move with these keys:</h3>
              <h4 className="mb-4">Give it a try!</h4>
              <ArrowKeysCanvas />
              <p className="game-description mt-4">
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
