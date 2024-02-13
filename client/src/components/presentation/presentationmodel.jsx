/* eslint-disable react/prop-types */
import logomainpage from "../../assets/logo-main-page.png";
import { Container, Row, Col, Button } from "react-bootstrap";

const PresentationModel = ({ title, paragraph}) => {
  return (
    <Container>
      <Row className="text-center mt-5">
        <Col>
          <h1 className="display-1 " style={{ marginTop: "30px", textShadow: '3px 3px 8px rgba(0, 0, 0, 6)' }} > {title}</h1>
          <p className="smaller-font" style={{ color: '#F0F0F0', textShadow: '2px 2px 3px rgba(0, 0, 0, 6)', fontSize: '1.2em' }}>
            {paragraph}
          </p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button
            variant="primary"
            size="lg"
            className="m-4"
            onClick={() => window.location.assign("#features")}
          >
            Learn More
          </Button>
          <Button
            variant="secondary "
            size="lg"
            className="m-4"
            onClick={() => window.location.assign("/signup")}
          >
            Start Free Trial
          </Button>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <img src={logomainpage} alt="Image" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default PresentationModel;
