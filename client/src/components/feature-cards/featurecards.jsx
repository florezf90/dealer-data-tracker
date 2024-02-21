/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const TwoColumnHero = ({ rowContents }) => {
  const setimgsize = (height, width) => {
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  const generateAlternatingRows = (rowContents) => {
    const rows = [];
    for (let i = 0; i < rowContents.length; i++) {
      const imagePosition = i % 2 === 0 ? "right" : "left"; // Alternate image position
      const { title, paragraph, imgSrc } = rowContents[i];
      rows.push(
        <Row key={i} className="mb-5  saes">
          {imagePosition === "left" && (
            <Col className="d-flex align-items-center justify-content-center">
              <img
                src={imgSrc}
                alt="Image"
                className="image my-5"
                style={setimgsize( 400, 350)}
              />
            </Col>
          )}
          <Col className="d-flex align-items-center justify-content-center">
            <div className="left-content text-center mt-5 pt-5">
              <h1 className="title" style={{textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)'}}>{title}</h1>
              <p className="paragraph text-center " style={{ maxWidth: "700px", textShadow: '2px 2px 1px rgba(0, 0, 0, 4)' }}>
                {paragraph}
              </p>
            </div>
          </Col>
          {imagePosition === "right" && (
            <Col className="d-flex align-items-center justify-content-center ">
              <img
                src={imgSrc}
                alt="Image"
                className="image saes my-5"
                style={setimgsize(360, 320)}
              />
            </Col>
          )}
        </Row>
      );
    }
    return rows;
  };

  return (
    <Container fluid className="container-fluid mt-5">
      {generateAlternatingRows(rowContents)}
    </Container>
  );
};

export default TwoColumnHero;
