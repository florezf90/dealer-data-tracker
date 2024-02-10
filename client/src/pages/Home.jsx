// import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
//  import Row from 'react-bootstrap/Row';




// const Home = () => {

  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // }
//   return (
// <Container>
//       <Row>
//         <Col>1 of 1</Col>
//       </Row>
//     </Container>
    // <main>
    //   <div className="">
    //     <div className="">
    //       <h1>welcome to the homepage</h1>
    //       <Link className="btn btn-lg btn-primary m-2" to="/login">
    //         login
    //       </Link>
    //       <br/>
    //       <Link className="btn btn-lg btn-primary m-2" to="/signup">
    //         sign-up
    //       </Link>
    //       {Auth.loggedIn() && (
    //         <button className="btn btn-lg btn-light m-2" onClick={logout}>
    //           Logout
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </main>
//   );
// };

// export default Home;


import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
