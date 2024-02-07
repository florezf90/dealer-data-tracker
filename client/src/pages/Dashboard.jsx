import { Link } from 'react-router-dom';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { useQuery } from '@apollo/client';


const Dashboard = () => {
  // State to store dealer performance data

  // Define the GraphQL query to fetch dealers
  const { data } = useQuery(GET_DEALERS);


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
            {dealer.firstName} {dealer.lastName}
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
