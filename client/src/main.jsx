import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import 'bootstrap/dist/css/bootstrap.min.css';

//import './index.css'

import App from './App.jsx'
import AboutUs from './pages/aboutUs/aboutus.jsx';
import ContactUs from './pages/contact-us/contactus.jsx'
import Signup from './pages/signup/Signup.jsx';
import Home from './pages/Home';
import Login from './pages/login/Login.jsx';
import Error from './pages/Error';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import DealerForm from './pages/DealerForm.jsx';
import ReportForm from './pages/addReport/ReportForm.jsx';
import ReportHistory from './pages/ReportHistory.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/contact-us',
        element: <ContactUs/>
      },
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }
      , {
        path: '/add-dealer',
        element: <DealerForm />
      }, {
        path: '/add-report/:dealerId',
        element: <ReportForm />
      }, {
        path: '/report-history/:dealerId',
        element: <ReportHistory />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
