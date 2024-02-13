/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import MainNavbar from '../components/navbar/navbar';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="login">
      <MainNavbar />
<Row style={{ height: '70vh' }}>
        <Col md={6} className="login-left d-flex align-items-center justify-content-center">
          <div className="welcome-back-text" style={{ fontSize: '3rem' }}>Welcome back!</div>
        </Col>
        <Col md={6} className="login-right d-flex align-items-center justify-content-center" >
          <Card className="w-50">
            <Card.Body>
              <h1>Login</h1>
              <div className="form-div d-flex flex-column align-items-center">
                {data ? (
                  <p>
                    Success! You may now head <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <Form onSubmit={handleFormSubmit} className="w-100">
                    <Form.Group controlId="formBasicEmail" className='my-4'>
                      <Form.Control
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className='my-4'>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='w-50 ml-5'>
                      Submit
                    </Button>
                  </Form>
                )}
                {error && <Alert variant="danger">{error.message}</Alert>}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default Login;