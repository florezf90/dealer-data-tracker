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


  const { loading, error, data } = useQuery(GET_DEALERS, {
    variables: { email: AuthService.getUserIdFromToken() }
  });



  if (!AuthService.loggedIn()) {
    window.location.assign('/login');    
  }

// Check if data is undefined or dealers // employees array is empty
if (!data || !data.user || !data.user.employees || data.user.employees.length === 0) {
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
  if (error) return <p>Error :(</p>;

return (
<div className="dashboard">
      <h2>Dealer Performance Dashboard</h2>
      <div className="dealer-performance-list">
        <ul>
          {data.user.employees.map(dealer => (
            <li key={dealer.id}>
              {dealer.firstName + " "}
              {dealer.lastName + " "}
              {dealer.email + " "}
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
