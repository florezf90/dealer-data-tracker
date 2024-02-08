import { Link } from 'react-router-dom';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import Auth from '../utils/auth';



const Dashboard = () => {
  // State to store dealer performance data
    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  // Define the GraphQL query to fetch dealers
  const { data } = useQuery(GET_DEALERS);

  if (!AuthService.loggedIn()) {
    window.location.assign('/login');    
  }

// Check if data is undefined or dealers array is empty
if (!data || !data.dealers || data.dealers.length === 0) {
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

return (
  <div className="dashboard">
    <h2>Dealer Performance Dashboard</h2>
    <div className="dealer-performance-list">
      <ul>
        {data.dealers.map(dealer => (
          <li key={dealer.id}>
            {dealer.firstName + "   "}
             {dealer.lastName } {
             dealer.email + "   "} 
             {dealer.createdAt}
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
