import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import './home.css'
const Home = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <main>
      <div className="">
        <div className="">
          <h1>Welcome to the Homepage</h1>
          <h2>To see your dealers. . .</h2> 
          <h3>Log in with your companie's email/password</h3>
          <Link className="btn btn-lg btn-primary m-2" to="/login">
            login
          </Link>
          <br/>
          <Link className="btn btn-lg btn-primary m-2" to="/signup">
            sign-up
          </Link>
          {Auth.loggedIn() && (
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
