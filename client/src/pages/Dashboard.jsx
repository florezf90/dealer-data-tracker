import { Link } from 'react-router-dom';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { useQuery } from '@apollo/client';
import  AuthService  from '../utils/auth';


const Dashboard = () => {
  // State to store dealer performance data

  // Define the GraphQL query to fetch dealers
  const { data, loading, error } = useQuery(GET_DEALERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // check if the user is logged in
  const isAuthenticated = AuthService.loggedIn();

  if (!isAuthenticated) {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }




// Check if data is undefined or dealers array is empty
  if (!data || !data.dealers) {
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
        {data.dealers.map((dealer) => (
          <li key={dealer.id}>
            <p>Name: {dealer.firstName} {dealer.lastName}</p>
            <p>Email: {dealer.email}</p>
            <p>Created At: {dealer.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
    <Link to="/add-dealer">
      <button>Add Dealer</button>
    </Link>
  </div>
);
};
export default Dashboard;
