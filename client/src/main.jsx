import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import 'bootstrap/dist/css/bootstrap.min.css';

// import './index.css'

import App from './App.jsx'
import AboutUs from './pages/aboutus.jsx';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard.jsx';
import DealerForm from './pages/DealerForm.jsx';
import ReportForm from './pages/ReportForm.jsx';
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
