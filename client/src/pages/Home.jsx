import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div className="">
        <div className="">
          <h1>welcome to the homepage</h1>
          <Link className="btn btn-lg btn-primary m-2" to="/login">
            login
          </Link>
          <br/>
          <Link className="btn btn-lg btn-primary m-2" to="/signup">
            sign-up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
