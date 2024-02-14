/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";



const TitleAndParagraph = ({ title, paragraph, paragraphpadding }) => {
    
  return (
    <Container className="my-5" >
      <Row className="text-center mt-5" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)' }}>
        <Col>
          <h1 className="display-1 " style={{ marginTop: "150px", textShadow: '3px 3px 8px rgba(0, 0, 0, 6)' }}> {title}</h1>
<p className="smaller-font" style={{ paddingBottom: paragraphpadding, color: '#F0F0F0', textShadow: '2px 2px 1px rgba(0, 0, 0, 6)', fontSize: '1.2em' }}>
  {paragraph}
</p>
        </Col>
      </Row>
    </Container>
  );
};

export default  TitleAndParagraph;