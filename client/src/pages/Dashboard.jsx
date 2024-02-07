import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DEALER_PERFORMANCE } from '../utils/queries';

const Dashboard = () => {
  // State to store dealer performance data
  const [dealerPerformance, setDealerPerformance] = useState([]);

  // Query to fetch dealer performance data
  const { loading, error, data } = useQuery(GET_DEALER_PERFORMANCE);

  useEffect(() => {
    if (data) {
      // Update state with fetched dealer performance data
      setDealerPerformance(data.dealerPerformance);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="dashboard">
      <h2>Dealer Performance Dashboard</h2>
      <div className="dealer-performance-list">
        {dealerPerformance.map((dealer) => (
          <div key={dealer.id} className="dealer-performance-item">
            <h3>{dealer.name}</h3>
            <p>Hands Dealt: {dealer.handsDealt}</p>
            <p>Promotional Drops: {dealer.promotionalDrops}</p>
            <p>Errors: {dealer.errors}</p>
          </div>
        ))}
      </div>
      <Link to="/add-performance">Add Dealer Performance</Link> {/* Link to a form to add dealer performance */}
    </div>
  );
};

export default Dashboard;
