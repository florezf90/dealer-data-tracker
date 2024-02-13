import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_DEALERS } from "../utils/queries"; // Import the GraphQL query
import { Card, Button } from "react-bootstrap";
import { REMOVE_DEALER } from "../utils/mutations";
import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import "./dashboard.css";

const Dashboard = () => {
  // State to store dealer performance data

  const [removeDealer] = useMutation(REMOVE_DEALER);

  const { loading, error, data } = useQuery(GET_DEALERS, {
    variables: { email: AuthService.getUserIdFromToken() },
  });

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleDelete = async (dealerId) => {
    try {
      await removeDealer({
        variables: { _id: dealerId },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!AuthService.loggedIn()) {
    window.location.assign("/login");
  }

  // Check if data is undefined or dealers // dealers array is empty
  if (
    !data ||
    !data.user ||
    !data.user.dealers ||
    data.user.dealers.length === 0
  ) {
    return (
      <div className="dealer-performance-list my-5">
        <Card className="mx-auto my-3 p-3" style={{ width: "50%" }}>
          <Card.Body>
            <Card.Title className="m-2 mx-4">
              {" "}
              <h2>Dealer Performance Dashboard </h2>
            </Card.Title>
            <p className="mx-4 my-5">
              {" "}
              <h5>No hired dealers yet</h5>
            </p>
            <Link to="/add-dealer">
              <Button variant="primary" className="m-2">
                Add Dealer
              </Button>
            </Link>
            {Auth.loggedIn() && (
              <Button variant="danger" className="m-2" onClick={logout}>
                Logout
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="dashboard">
      <div className="text-center my-5">
        <div className="row">
          <div className="col-6 offset-3">
            <h2
              style={{
                backgroundColor: "white",
                padding: "10px",
                color: "black",
                borderRadius: "8px",
              }}
            >
              Dealer Performance Dashboard
            </h2>
            <Link to="/add-dealer">
              <Button variant="primary" className="m-2">
                Add Dealer
              </Button>
            </Link>
            {Auth.loggedIn() && (
              <Button variant="danger" className="m-2" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="dealer-performance-list my-5">
        {data.user.dealers.map((dealer) => (
          <Card
            key={dealer._id}
            className="mx-auto my-3 p-3"
            style={{ width: "50%" }}
          >
            <Card.Body>
              <Card.Title className="m-2 mx-4">
                {dealer.firstName} {dealer.lastName}
              </Card.Title>
              <Card.Subtitle className="mx-4 my-3 text-muted">
                {dealer.email}
              </Card.Subtitle>
              <Card.Text className="mx-4 ">
                hired on: {dealer.createdAt}
              </Card.Text>
              <div className="mb-2 mx-3">
                <Button
                  variant="danger"
                  className="my-4 mx-2"
                  onClick={() => handleDelete(dealer._id)}
                >
                  Delete
                </Button>
                <Link to={"/report-history/" + dealer._id}>
                  <Button variant="primary" className="mr-2 mx-2">
                    View Reports
                  </Button>
                </Link>
                <Link to={"/add-report/" + dealer._id}>
                  <Button variant="primary" className="mr-2 mx-2">
                    New Report
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
