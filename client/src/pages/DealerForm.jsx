import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DEALER } from '../utils/mutations';
import  AuthService  from '../utils/auth';
import { Card, Button } from 'react-bootstrap';
// import { Link, useHistory } from 'react-router-dom';



function DealerForm() {
  const [formState, setFormState] = useState({ email: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_DEALER);
  const isAuthenticated = AuthService.loggedIn();

    const handleLogout = () => {
    AuthService.logout();
    window.location.replace('/login');
  };

    const handleGoBack = () => {
window.location.assign('/dashboard');  
};


  if (!isAuthenticated) {
    window.location.assign('/login');
    
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await addUser({
      variables: {
        email: formState.email,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    console.log(data);
    setFormState({
      email: '',
      firstName: '',
      lastName: '',
    } [data]);
    window.location.assign('/dashboard');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card className="p-5 text-center" style={{ width: '50rem', padding: '20px', backgroundColor: 'white' }}>
      <h1>Add Dealer</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName" className='mx-1 my-2'>First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName" className=' mx-1 my-2'>Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email" className='mx-4 my-3'>Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <Button type="submit" variant='dark' >Submit</Button>
          <Button variant='primary' className=' mx-5 my-5' onClick={handleGoBack}>go back to dashboard</Button>
          <Button variant='danger' onClick={handleLogout}>logout</Button>
        </div>
      </form>
      </Card>
    </div>
  );
}

export default DealerForm;
