import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DEALER_PERFORMANCE } from '../utils/queries';

const Dashboard = () => {
  // State to store dealer performance data

  return (
    <div className="dashboard">
      <h2>Dealer Performance Dashboard</h2>
      <div className="dealer-performance-list">
        <p>your mom </p>
      </div>
      <Link to="/add-performance">Add Dealer Performance</Link> {/* Link to a form to add dealer performance */}
    </div>
  );
};

export default Dashboard;
