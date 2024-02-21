import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DEALERS } from "../../utils/queries";
import { REMOVE_DEALER } from "../../utils/mutations";
import { Card, Button, Modal } from "react-bootstrap";
import AuthService from "../../utils/auth";
import Auth from "../../utils/auth";
import "./dashboard.css";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [removeDealer] = useMutation(REMOVE_DEALER);
  const [firemodal, setFireModal] = useState(false);
  const handleClose = () => setFireModal(false);
  const HandleFireModal = () => setFireModal(true);

  const { loading, error, data } = useQuery(GET_DEALERS, {
    variables: { email: AuthService.getUserIdFromToken() },
  });

  useEffect(() => {
    if (data && data.user && data.user.dealers) {
      setFilteredDealers(data.user.dealers);
    }
  }, [data]);

  if (!AuthService.loggedIn()) {
    window.location.assign("/login");
  }

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

  if (
    !data ||
    !data.user ||
    !data.user.dealers ||
    data.user.dealers.length === 0
  ) {
    return (
      <div className="dashboard">
        <h2>Dealer Performance Dashboard</h2>
        <p>No dealers available</p>
        <Link to="/add-dealer">
          <button>Add Dealer</button>
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const filterDealers = (query) => {
    if (!query) {
      setFilteredDealers(data.user.dealers);
      return;
    }

    const filtered = data.user.dealers.filter((dealer) => {
      const fullName = `${dealer.firstName} ${dealer.lastName}`;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredDealers(filtered);
  };

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
              }}
            >
              Dealer  Dashboard
            </h2>
            <Link to="/add-dealer">
              <Button variant="primary" className="m-2">
                Add Dealer
              </Button>
            </Link>
            {Auth.loggedIn() && (
              <Button variant="light" className="m-2" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            filterDealers(e.target.value);
          }}
          className="form-control mb-4"
        />
      </div>

      <div
        className="dealer-performance-list my-5"
        style={{ width: "50%", margin: "auto" }}
      >
        {filteredDealers.map((dealer) => (
          <Card
            key={dealer._id}
            className="mx-auto my-3 p-3 "
            style={{ width: "100%" }}
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
                  onClick={HandleFireModal}
                >
                  Delete
                </Button>
                <Modal
                  show={firemodal}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>Wait!!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ color: "black" }}>
                    Are you sure you want to fire this dealer?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                      {" "}
                      Nevermind{" "}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(dealer._id)}
                    >
                      {" "}
                      Fire{" "}
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Link to={`/report-history/${dealer._id}`}>
                  <Button variant="primary" className="mr-2 mx-2 my-4">
                    View Reports
                  </Button>
                </Link>
                <Link to={`/add-report/${dealer._id}`}>
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
