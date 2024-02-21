import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "./index.css"

// eslint-disable-next-line react/prop-types
const TeamPresentation = ({ cardData }) => {
    const handleIconClick = (url) => {
      window.open(url, "_blank");
    }

    const hanldeMailClick = (email) => {
      window.location.href = `mailto:${email}`;
    }

  return (
     <Container className="my-5 ">
      <Row className="text-center mt-5">
        <Col>
          <h1 className="display-1" style={{ marginTop: "150px", textShadow: '2px 2px 5px rgba(0, 0, 0, 6)' }}>
            The developer Team
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-around mt-5 mx-auto">
        {cardData.map((data, index) => (
          <Col key={index} md={3}>
            <Card className="text-center my-5">
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center mb-3">
                </div>
                <img src={data.imgSrc} alt="developer" className="circle-placeholder mb-4"/>
                <Card.Title>{data.title}</Card.Title>
                <ListGroup variant="flush">
                  {data.items.map((item, itemIndex) => (
                    <ListGroup.Item key={itemIndex}>{item}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Row className="justify-content-around mt-3 ">
                  {data.icons.map((icon, iconIndex) => (
                    <Col key={iconIndex} onClick={() => {
                        if (icon.type === "socialmedia" ) {
                            handleIconClick(icon.url);
                        } else if (icon.type === "mail") {
                            hanldeMailClick(icon.url);
                        }
                    }}>
                      <img src={icon.src} alt={`icon${iconIndex}`} className="icon-placeholder my-3" /> {/* Placeholder for the icons */}
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamPresentation;