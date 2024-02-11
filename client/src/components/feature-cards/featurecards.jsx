/* eslint-disable react/prop-types */
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TwoColumnHero = ({ rowContents}) => {

    const setimgsize = (size) => {
      return {
        width: `${size}px`,
        height: `${size}px`
      }
    }

  const generateAlternatingRows = (rowContents ) => {
    const rows = [];
    for (let i = 0; i < rowContents.length; i++) {
      const imagePosition = i % 2 === 0 ? 'right' : 'left'; // Alternate image position
      const { title, paragraph, imgSrc } = rowContents[i];
      rows.push(
<Row key={i} className='mb-5'>
  {imagePosition === 'left' && (
    <Col className="d-flex align-items-center justify-content-center">
      <img src={imgSrc} alt="Image" className="image my-5" style={setimgsize(400)} />
    </Col>
  )}
  <Col className="d-flex align-items-center justify-content-center">
    <div className="left-content text-center mt-5 pt-5">
      <h1 className="title">{title}</h1>
      <p className="paragraph">{paragraph}</p>
    </div>
  </Col>
  {imagePosition === 'right' && (
    <Col className="d-flex align-items-center justify-content-center">
      <img src={imgSrc} alt="Image" className="image my-5" style={setimgsize(400)} />
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