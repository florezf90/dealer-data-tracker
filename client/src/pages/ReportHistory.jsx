// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_REPORTS } from '../utils/queries'; // Import the GraphQL query
import AuthService from '../utils/auth';
import Auth from '../utils/auth';
// import { useParams } from 'react-router-dom';




const ReportHistory = () => {
  // const {dealerId}= useParams();
  // State to store dealer performance data

  // const { loading, error, data } = useQuery(GET_REPORTS, {
  //   variables: { email: AuthService.getUserIdFromToken() }
  // });

    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  if (!AuthService.loggedIn()) {
    window.location.assign('/login');    
  }

// Check if data is undefined or dealers // employees array is empty
// if (!data || !data.user || !data.user.employees || data.user.employees.length === 0) {
//   return (
//     <div className="report-history">
//       <h2>Report History</h2>
//       <p>No reports available</p>
//       <Link to={"/add-report/"+dealerId}>
//         <button>Add Report</button>
//       </Link>
//     </div>
//   );
// }

//     if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;

return (
<div className="report-history">
      <h2>Report History</h2>
      <div className="history">
        <ul>
          {/* {data.reports.map(report => (////TODOcheck this variable data.reports.map
            <li key={report.dealerId}>
              {report.handsDealt + " "}
              {report.promotionTaken + " "}
              {report.moneyTaken + " "}
            </li>
          ))} */}
        </ul>
      </div>
      {Auth.loggedIn() && (
        <button className="btn btn-lg btn-light m-2" onClick={logout}>
          Logout
        </button>
      )}
    </div>
);
};
export default ReportHistory;
