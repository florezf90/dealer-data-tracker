import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REPORT } from '../utils/mutations';
import  AuthService  from '../utils/auth';
import { useParams } from 'react-router-dom';




function ReportForm() {
  const {dealerId} = useParams();
  const [formState, setFormState] = useState({ handsDelt: '', promotionTaken: '', moneyTaken: '' });
  const [addReport] = useMutation(ADD_REPORT);
  const isAuthenticated = AuthService.loggedIn();


  if (!isAuthenticated) {
    window.location.assign('/login');
    
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(`dealerId ${dealerId} handsDelt ${formState.handsDelt} promotionTaken ${formState.promotionTaken} moneyTaken ${formState.moneyTaken}`)
    const data = await addReport({
      variables: {
        dealerId: dealerId,
        handsDelt: formState.handsDelt,
        promotionTaken: formState.promotionTaken,
        moneyTaken: formState.moneyTaken,
      },
    });
    console.log(data);
    setFormState({
      dealerId: '',
      handsDelt: '',
      promotionTaken: '',
      moneyTaken: '',
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

      <h2>Dealer Report</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="dealerId">dealerId:</label>
          <input
            value={dealerId}
            name="dealerId"
            type="dealerId"
            id="dealerId"
            disabled
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="handsDelt">Hands Delt:</label>
          <input
            placeholder="handsDelt"
            name="handsDelt"
            type="handsDelt"
            id="handsDelt"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="promotionTaken">Promotion Taken:</label>
          <input
            placeholder="Last"
            name="promotionTaken"
            type="promotionTaken"
            id="promotionTaken"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="moneyTaken">Money Taken:</label>
          <input
            placeholder="Last"
            name="moneyTaken"
            type="moneyTaken"
            id="moneyTaken"
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

export default ReportForm;