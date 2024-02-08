import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_DEALER } from '../utils/mutations';
import  AuthService  from '../utils/auth';


function DealerForm() {
  const [formState, setFormState] = useState({ email: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_DEALER);
  const isAuthenticated = AuthService.loggedIn();

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
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

        <button>
        <Link to="/dashboard"> go back</Link>
      </button>

      <h2>add dealer</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default DealerForm;
