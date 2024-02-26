import { useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REPORT } from "../../utils/mutations";
import { GET_LAST_REPORT } from "../../utils/queries";
import AuthService from "../../utils/auth";
import { useParams } from "react-router-dom";
import './index.css'

function ReportForm() {
  const { dealerId } = useParams();
  const [formState, setFormState] = useState({
    handsDealt: "",
    promotionTaken: "",
    moneyTaken: "",
  });
  const [addReport] = useMutation(ADD_REPORT);
  const isAuthenticated = AuthService.loggedIn();

  const { loading, error, data } = useQuery(GET_LAST_REPORT, {
    variables: { dealerId: dealerId },
  });

  if (!isAuthenticated) {
    window.location.assign("/login");
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `dealerId ${dealerId} handsDealt ${formState.handsDealt} promotionTaken ${formState.promotionTaken} moneyTaken ${formState.moneyTaken}`
    );
    const data = await addReport({
      variables: {
        dealerId: dealerId,
        handsDealt: Number(formState.handsDealt),
        promotionTaken: Number(formState.promotionTaken),
        moneyTaken: Number(formState.moneyTaken),
      },
    });
    console.log("data:" + data);
    setFormState(
      {
        dealerId: "",
        handsDealt: "",
        promotionTaken: "",
        moneyTaken: "",
      }[data]
    );
    window.location.assign("/dashboard");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container fluid className="report-history">
      <Row style={{ marginTop: "15vh" }}>
        <Col md={6} className="d-flex justify-content-center align-items-start">
          <Card className="w-75 my-4 d-flex justify-content-center">
            <Card.Body>
              <h1 className="text-center my-3">
                <Badge bg="danger"> New Report Form</Badge>
              </h1>
              <form
                onSubmit={handleFormSubmit}
                className="text-center my-3 p-5"
              >
                <div className="flex-row space-between my-3">
                  <label htmlFor="dealerId" className="mx-4 my-2">
                    dealerId:
                  </label>
                  <input
                    value={dealerId}
                    name="dealerId"
                    type="text"
                    id="dealerId"
                    disabled
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row space-between my-4">
                  <label htmlFor="handsDealt" className="mx-4 my-2">
                    Hands Dealt:{" "}
                  </label>
                  <input
                    placeholder="Hands Dealt"
                    name="handsDealt"
                    type="text"
                    id="handsDealt"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row space-between my-4 ">
                  <label htmlFor="promotionTaken" className="mx-2 my-2">
                    Promotion Taken:
                  </label>
                  <input
                    placeholder="Promotion Taken"
                    name="promotionTaken"
                    type="text"
                    id="promotionTaken"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row space-between my-4">
                  <label htmlFor="moneyTaken" className="mx-4 my-2">
                    Money Taken:
                  </label>
                  <input
                    placeholder="Money Taken"
                    name="moneyTaken"
                    type="text"
                    id="moneyTaken"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-row flex-end formBtns">
                  <Button type="submit" variant="danger">
                    Submit
                  </Button>
                  <Button
                    variant="primary"
                    className="mx-3 my-5"
                    as={Link}
                    to="/dashboard"
                  >
                    dashboard
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          {/* Right container */}
          <Card className="w-75 my-4">
            <Card.Body>
              <h1 className="text-center my-3">
                <Badge bg="danger"> Last Report </Badge>
              </h1>
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {!loading && !error && !data.lastReport && (
                <p className="text-center" style={{ marginTop: "100px" }}><h1>No data available yet</h1></p>
              )}
              {data && data.lastReport && data.dealer && (
                <div className="text-center mt-5 lastReportCard" >
                  <p>
                    <h3>Dealer:</h3> {data.dealer.firstName} {data.dealer.lastName}
                  </p>
                  <p><h3>Hands Dealt:</h3> {data.lastReport.handsDealt}</p>
                  <p><h3>Promotion Taken:</h3> {data.lastReport.promotionTaken}</p>
                  <p><h3>Money Taken: </h3>{data.lastReport.moneyTaken}</p>
                  <p><h3>Created At:</h3> {data.lastReport.createdAt}</p>
                  {/* Render other fields of the last report */}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ReportForm;
