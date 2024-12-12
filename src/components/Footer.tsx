import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              © {new Date().getFullYear()} - Degree project by Anna Brynhagen|
              Created: December 2024
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
