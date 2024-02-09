import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_DEALERS } from '../utils/queries'; // Import the GraphQL query
import { REMOVE_DEALER } from '../utils/mutations';
import AuthService from '../utils/auth';
import Auth from '../utils/auth';



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
    try {
      await removeDealer({
        variables: { _id: dealerId },
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }



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
  if (error) return <p>Error :</p>;

return (
<div className="dashboard">
      <h2>Dealer Performance Dashboard</h2>
      <div className="dealer-performance-list">
        <ul>
          {data.user.employees.map(dealer => (
            <li key={dealer._id}>
              {dealer.firstName + " "}
              {dealer.lastName + " "}
              {dealer.email + " "}
              {dealer.createdAt + " "}
              <button onClick={() => handleDelete(dealer._id)}> delete </button>
              <Link to={"/report-history/"+dealer._id}><button>view Reports</button></Link>
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
