/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";



const TitleAndParagraph = ({ title, paragraph }) => {
    
  return (
    <Container className="my-5" >
      <Row className="text-center mt-5" >
        <Col>
          <h1 className="display-1 " style={{ marginTop: "150px" }}> {title}</h1>
          <p className="smaller-font" style={{ marginBottom: "150px" }}>
            {paragraph}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default  TitleAndParagraph;