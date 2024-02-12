import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DEALER } from "../utils/queries"; // Import the GraphQL query
import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";

const ReportHistory = () => {
  const { dealerId } = useParams();
  const { loading, error, data } = useQuery(GET_DEALER, {
    variables: {
      email: AuthService.getUserIdFromToken(),
      _id: dealerId,
    },
  });
  console.log("query data: " + data);

  console.log(data);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (!AuthService.loggedIn()) {
    window.location.assign("/login");
  }

  // Check if data is undefined or dealers // reports array is empty
  if (
    !data ||
    !data.dealer ||
    !data.dealer.reports ||
    data.dealer.reports.length === 0
  ) {
    return (
      <div className="report-history">
        <h2>Report History</h2>
        <p>No reports available</p>
        <Link to={"/add-report/" + dealerId}>
          <button>Add Report</button>
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="report-history">
      <h2>Report History</h2>
      <div className="history">
        <ul>
          {data.dealer.reports.map((report, index) => (
            <li key={index}>
              <p>
                Dealer :{report._id}
                {data.dealer.lastName + ", " + data.dealer.firstName + ": "}
              </p>
              <p>Hands Dealt: {report.handsDealt + " "}</p>
              <p>Promotion Taken: {report.promotionTaken + " "}</p>
              <p>Money Taken: {report.moneyTaken + " "}</p>
              <p>Report Date: {report.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>
      {Auth.loggedIn() && (
        <button className="btn btn-lg btn-light m-2" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};
export default ReportHistory;
