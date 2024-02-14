import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DEALERS_AND_REPORTS } from "../utils/queries"; // Import the GraphQL query
import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Button,
  Badge,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const ReportHistory = () => {
  //brings in dealer id from url params
  const { dealerId } = useParams();
  //querys for user object to get users dealer array
  const { loading, error, data } = useQuery(GET_DEALERS_AND_REPORTS, {
    variables: { email: AuthService.getUserIdFromToken() },
  });
  //diffrent displays for while loading and if theres an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  //extracts and sorts data => gets current dealer to set for top of select and to view reports
  const userData = data;
  const dealers = userData.user.dealers;
  const currentDealer = dealers.find((dealer) => dealer._id == dealerId);
  const otherDealers = dealers.filter((dealer) => dealer._id !== dealerId);
  console.log(currentDealer);

  // Calculate averages for each category
  const calculateAverages = () => {
    let handsDealtTotal = 0;
    let promotionTakenTotal = 0;
    let moneyTakenTotal = 0;

    currentDealer.reports.forEach((report) => {
      handsDealtTotal += report.handsDealt;
      promotionTakenTotal += report.promotionTaken;
      moneyTakenTotal += report.moneyTaken;
    });

    const totalReports = currentDealer.reports.length;

    return {
      handsDealtAvg: totalReports > 0 ? handsDealtTotal / totalReports : 0,
      promotionTakenAvg:
        totalReports > 0 ? promotionTakenTotal / totalReports : 0,
      moneyTakenAvg: totalReports > 0 ? moneyTakenTotal / totalReports : 0,
    };
  };
  const averages = calculateAverages();

  //logout functionality
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  //if not logged in or token is expired redirects to login
  if (!AuthService.loggedIn()) {
    window.location.assign("/login");
  }
  //creates new report button and tooltip on hover
  const AddReportDiv = () => {
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="new-report-tooltip">Create New Report!</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            as="a"
            href={"/add-report/" + dealerId}
            ref={ref}
            variant="danger"
            {...triggerHandler}
            className="d-inline-flex align-items-center my-5"
          >
            &#x1f5ce;+
          </Button>
        )}
      </OverlayTrigger>
    );
  };
  //select to use to pick what employee to view uses map of dealers
  const DealerSelectDiv = () => {
    return (
      <div className="dealer-select-div">
        <DropdownButton
          id="dealers-dropdown"
          title={currentDealer.lastName + ", " + currentDealer.firstName}
          variant="primary"
        >
          <Dropdown.Item active>
            {currentDealer.lastName + ", " + currentDealer.firstName}
          </Dropdown.Item>
          {otherDealers.map((dealer, index) => (
            <Dropdown.Item href={"/report-history/" + dealer._id} key={index}>
              {dealer.lastName + ", " + dealer.firstName}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    );
  };
  //renders list of reports if avalible
  const DealerReportsDiv = () => {
    //if the dealer has no reports display no reports
    if (!currentDealer.reports || currentDealer.reports.length === 0)
      return (
        <div className="text-center">
          <p><h1>No reports available</h1> </p>
        </div>
      );
    //if the dealer has reports display reports in accordion format
    return (
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {currentDealer.reports.map((report, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{report.createdAt}</Accordion.Header>
            <Accordion.Body>
              <p>Hands Dealt: {report.handsDealt + " "}</p>
              <p>Promotion Taken: {report.promotionTaken + " "}</p>
              <p>Errors Made: {report.moneyTaken + " "}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };
  //final return putting it all together
  return (
    <Container fluid className="report-history">
      <Row  style={{ marginTop: "15vh" }} >
        <Col md={6} className="d-flex justify-content-center align-items-start">
          {/* Left container */}
          <Card className="w-75 my-4 d-flex justify-content-center">
            <Card.Body>
              <h1 className="text-center my-3" >
                <Badge  >Dealer summary</Badge>
              </h1>
              <div className="d-flex justify-content-center mt-5">
                <DealerSelectDiv />
              </div>
              <Row>
                <Col className="text-center my-5">
                  <h2>Average Report Categories</h2>
                  <p>
                    Hands Dealt Average: {averages.handsDealtAvg.toFixed(2)}
                  </p>
                  <p>
                    Promotion Taken Average:{" "}
                    {averages.promotionTakenAvg.toFixed(2)}
                  </p>
                  <p>
                    Errors Made Average: {averages.moneyTakenAvg.toFixed(2)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center mb-4">
                  <Link to="/dashboard">
                    <Button className="mx-3" variant="dark">Back to Dashboard</Button>
                  </Link>

                  {Auth.loggedIn() && <Button onClick={logout} variant="danger">Logout</Button>}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          {/* Right container */}
          <Card className="w-75 my-4">
            <Card.Body>
              <h1 className="text-center my-3">
                <Badge>Report History</Badge>
              </h1>
              <div className="d-flex justify-content-center">
                <AddReportDiv />
                <OverlayTrigger placement="top" overlay={<Tooltip > Having issues? Contact Us</Tooltip>}>
                 <Button variant="dark" className="mx-3 my-5" as={Link} to="/contact-us">Get Help</Button>
                </OverlayTrigger>
              </div>
              <DealerReportsDiv />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ReportHistory;
