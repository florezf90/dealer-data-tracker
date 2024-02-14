import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { Card, Button} from 'react-bootstrap';
import { REMOVE_DEALER } from '../utils/mutations';
import AuthService from '../utils/auth';
import Auth from '../utils/auth';
import './dashboard.css';


const Dashboard = () => {
  // State to store dealer performance data
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDealers, setFilteredDealers] = useState([]);
  
  const [removeDealer] = useMutation(REMOVE_DEALER);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealerIdToDelete, setDealerIdToDelete] = useState(null);

 const handleShowDeleteModal = (dealerId) => {
    setDealerIdToDelete(dealerId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeDealer({
        variables: { _id: dealerIdToDelete },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setShowDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const { loading, error, data } = useQuery(GET_DEALERS, {
    variables: { email: AuthService.getUserIdFromToken() },
  });

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
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
                borderRadius: "8px",
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
                  onClick={() => handleShowDeleteModal(dealer._id)}
                >
                  fire his ass!
                </Button>
                <Link to={"/report-history/" + dealer._id}>
                  <Button variant="dark" className="mr-2 mx-2">
                    View Reports
                  </Button>
                </Link>
                <Link to={"/add-report/" + dealer._id}>
                  <Button variant="primary" className="mr-2 mx-2 my-3">
                    New Report
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>wait....!!</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "black" }}>Are you sure you want to delete this dealer?</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseDeleteModal}>
          Close
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
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
    <div className="dealer-performance-list my-5" style={{ width: '50%', margin: 'auto' }}>
        {filteredDealers.map((dealer) => (
      <Card key={dealer._id} className="mx-auto my-3 p-3" style={{ width: '50%' }}>
        <Card.Body>
          <Card.Title className='m-2 mx-4'>{dealer.firstName} {dealer.lastName}</Card.Title>
          <Card.Subtitle className="mx-4 my-3 text-muted">{dealer.email}</Card.Subtitle>
          <Card.Text className="mx-4 ">
            hired on: {dealer.createdAt}
          </Card.Text>
          <div className="mb-2 mx-3">
            <Button variant="danger" className="my-4 mx-2" onClick={() => handleDelete(dealer._id)}>Delete</Button>
            <Link to={"/report-history/" + dealer._id}><Button variant="primary" className="mr-2 mx-2">View Reports</Button></Link>
            <Link to={"/add-report/" + dealer._id}><Button variant="primary" className="mr-2 mx-2">New Report</Button></Link>
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
</div>
);

};

export default Dashboard;
