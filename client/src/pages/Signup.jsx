import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import {Form, Button, Card, Row, Col} from 'react-bootstrap';
import MainNavbar from '../components/navbar/navbar';
function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <main className="signup" style={{ height: '100vh' }}>
      <MainNavbar />
      <Row style={{ height: '70vh' }}>
        <Col md={6} className="signup-left d-flex align-items-center justify-content-center">
          <Card className="w-50">
            <Card.Body className="d-flex flex-column align-items-center">
              <h1 className="text-center">Signup</h1>
              <div className="form-div d-flex flex-column align-items-center w-100">
                <Form onSubmit={handleFormSubmit} className="w-100">
                  <Form.Group controlId="formBasicFirstName" className='my-2'>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName" className='my-2'>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className='my-2'>
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className='my-2'>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center w-100 mb-4">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </div>
              <div className="text-center">
                Already have an account?{' '}
                <Link to="/login">
                  Login
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="signup-right d-flex align-items-center justify-content-center">
          <div className="placeholder-text">
            <h2>Join our community</h2>
            <p>Get access to exclusive features by signing up.</p>
          </div>
        </Col>
      </Row>
    </main>

  );
}

export default Signup;

