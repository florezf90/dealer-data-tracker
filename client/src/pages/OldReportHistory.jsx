import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DEALER } from "../utils/queries"; // Import the GraphQL query
import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { Accordion, Button, Row, Col, Container,  } from "react-bootstrap";

const ReportHistory = () => {
  const { dealerId } = useParams();
  const { loading, error, data } = useQuery(GET_DEALER, {
    variables: {
      email: AuthService.getUserIdFromToken(),
      _id: dealerId,
    },
  });
  console.log("query data: " + data);

  console.log(data);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (!AuthService.loggedIn()) {
    window.location.assign("/login");
  }

  // Check if data is undefined or dealers // reports array is empty
  if (
    !data ||
    !data.dealer ||
    !data.dealer.reports ||
    data.dealer.reports.length === 0
  ) {
    return (
      <div className="report-history">
        <h2>Report History</h2>
        <p>No reports available</p>
        <Link to={"/add-report/" + dealerId}>
          <button>Add Report</button>
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
   <div className="report-history">
      <Container>
        <Row>
          <Col md={6}>
            <div className="left-container">
              <h2>Average Report</h2>
              <Link to="/dashboard">
                <Button>Back to Dashboard</Button>
              </Link>
              {Auth.loggedIn() && (
                <Button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </Button>
              )}
            </div>
          </Col>
          <Col md={6}>
            <div className="right-container">
              <h2>Report History</h2>
              <Button>
                <img src="logo.png" alt="Logo" />
                <span className="tooltiptext">Tooltip text</span>
              </Button>
              <Button>
                <img src="new-logo.png" alt="New Logo" />
                <span className="tooltiptext">Need help? Please click here</span>
              </Button>
              <Accordion>
                {data.dealer.reports.map((report, index) => (
                  <Accordion.Item key={index}>
                    <Accordion.Header>
                      Report ID: {report._id}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>Dealer Name: {data.dealer.lastName + ", " + data.dealer.firstName}</p>
                      <p>Hands Dealt: {report.handsDealt}</p>
                      <p>Promotion Money Taken: {report.promotionTaken}</p>
                      <p>Errors Made: {report.moneyTaken}</p>
                      <p>Report Date: {report.createdAt}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ReportHistory;
