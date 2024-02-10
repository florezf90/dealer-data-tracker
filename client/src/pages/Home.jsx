import MainNavbar from "../components/navbar/navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import logomainpage from "../assets/logo-main-page.png";

const Home = () => {

  return (
    <main>
      <MainNavbar />
          <div className="hero-container mt-5 p-5">
      <Container>
        <Row className="text-center mt-5">
          <Col>
            <h1 className="display-1 "> Big Centered Title</h1>
            <p className="smaller-font">Paragraph below the title with smaller font size</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="primary" size="lg" className="m-4" onClick={() => window.location.assign('#features')}>Learn More</Button>
            <Button variant="secondary " size="lg" className="m-4" onClick={() => window.location.assign('/signup')}>Start Free Trial</Button>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <img src={logomainpage} alt="Image" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
    </main>
  );
};

export default Home;
