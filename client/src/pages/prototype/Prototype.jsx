import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DEALERS_AND_REPORTS } from '../../utils/queries'; // Import the GraphQL query
import AuthService from '../../utils/auth';
import Auth from '../../utils/auth';
import { useParams } from "react-router-dom";
import { Accordion, Button, Badge, Dropdown, DropdownButton, OverlayTrigger, Tooltip, Container, Row, Col} from 'react-bootstrap';

const ReportHistoryPrototype = () => {
  //brings in dealer id from url params
  const { dealerId } = useParams();
  //querys for user object to get users dealer array
  const { loading, error, data } = useQuery(GET_DEALERS_AND_REPORTS, {
    variables: { email: AuthService.getUserIdFromToken() }
  });
  //diffrent displays for while loading and if theres an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  //extracts and sorts data => gets current dealer to set for top of select and to view reports
  const userData = data;
  const dealers = userData.user.dealers;
  const currentDealer = dealers.find((dealer)=>dealer._id==dealerId);
  const otherDealers = dealers.filter((dealer)=> dealer._id !== dealerId);
  console.log(currentDealer);
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
  const AddReportDiv=()=>{
  return(
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="new-report-tooltip">Create New Report!</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          as="a"
          href={"/add-report/" + dealerId}
          ref={ref}
          variant="primary"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
        &#x1f5ce;+
        </Button>
      )}
    </OverlayTrigger>
  )}
  //select to use to pick what employee to view uses map of dealers
  const DealerSelectDiv=()=>{
    return(
      <div className="dealer-select-div">
        <DropdownButton
          id="dealers-dropdown"
          title={currentDealer.lastName+", "+currentDealer.firstName}
        >
          <Dropdown.Item active>
            {currentDealer.lastName+", "+currentDealer.firstName}
          </Dropdown.Item>
          {otherDealers.map((dealer, index)=>(
            <Dropdown.Item href={'/report-history-prototype/'+dealer._id} key={index}>
              {dealer.lastName+", "+dealer.firstName}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>)
  }
  //renders list of reports if avalible
  const DealerReportsDiv=()=>{
    //if the dealer has no reports display no reports
    if (!currentDealer.reports || currentDealer.reports.length === 0)
    return(
    <div>
      <p>No reports available</p>
    </div>
    )
    //if the dealer has reports display reports in accordion format
    return(
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {currentDealer.reports.map((report, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{report.createdAt}</Accordion.Header>
            <Accordion.Body>
              <p>Hands Dealt: {report.handsDealt + " "}</p>
              <p>Promotion Taken: {report.promotionTaken + " "}</p>
              <p>Money Taken: {report.moneyTaken + " "}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  }
  //final return putting it all together
  return (
    <Container fluid className="report-history">
      <Row className=""><h1><Badge>Report History</Badge></h1></Row>
      <Row>
        <Col>
          <DealerSelectDiv/>
        </Col>
        <Col>
          <AddReportDiv/>
        </Col>
      </Row>
      <Row>
        <DealerReportsDiv/>
      </Row>
      <Row>
        <Col>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </Col>
        {Auth.loggedIn() && (
          <Col>
            <Button onClick={logout}>
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default ReportHistoryPrototype;