import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { REMOVE_DEALER } from '../utils/mutations';
import AuthService from '../utils/auth';
import Auth from '../utils/auth';
import './dashboard.css';

const Dashboard = () => {
  // State to store dealer performance data

  const [removeDealer] = useMutation(REMOVE_DEALER);


  const { loading, error, data } = useQuery(GET_DEALERS, {
    variables: { email: AuthService.getUserIdFromToken() }
  });

    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  const handleDelete = async (dealerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this dealer?"); //delete confirmation pop up
    if (confirmDelete) {
      try {
        await removeDealer({
          variables: { _id: dealerId },
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }



  if (!AuthService.loggedIn()) {
    window.location.assign('/login');    
  }

// Check if data is undefined or dealers // dealers array is empty
if (!data || !data.user || !data.user.dealers || data.user.dealers.length === 0) {
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

return (
<div className="dashboard">
      <h2>Dealer Performance Dashboard</h2>

      <div className="dealer-performance-list">
        <ul>
          {data.user.dealers.map(dealer => (
            <li key={dealer._id}>
          <span className="dealer-name">
            {dealer.firstName} {dealer.lastName}
          </span>
              {dealer.email + " "}
              <p>Created on : {dealer.createdAt + " "}</p>
              <button onClick={() => handleDelete(dealer._id)}> DELETE </button>
              <Link to={"/report-history/"+dealer._id}><button>View Reports</button></Link>
              <Link to={"/add-report/"+dealer._id}><button>New Report</button></Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/add-dealer">
        <button>Add Dealer</button>
      </Link>
      {Auth.loggedIn() && (
        <button className="btn btn-lg btn-light m-2" onClick={logout}>
          Logout
        </button>
      )}
    </div>
);
};
export default Dashboard;
