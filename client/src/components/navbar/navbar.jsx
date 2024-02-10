import { Navbar, Nav, Container,  } from 'react-bootstrap';
import CustomDropdown from '../dropdown/dropdown';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import "./CustomNavbar.css";


const MainNavbar = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsloggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Set isSmallScreen to true if the window width is less than 768px
    };

    window.addEventListener('resize', handleResize); // Add event listener for window resize

    if (location.pathname === '/') {
      handleResize();
    }
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]); // Empty dependency array to ensure the effect runs only once

  const dropdownTitle = `Menu`;
  const dropdownOptions = [
    { label: 'Features', href: '/features' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/Contact-us' },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
        {isSmallScreen && <CustomDropdown title={dropdownTitle} options={dropdownOptions} />}
        <Nav className={isSmallScreen ? "mr-auto hidden" : "mr-auto"}>
          <Nav.Link href="/features">Features</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          <Nav.Link href="/contact">Contact Us</Nav.Link>
        </Nav>
        <Nav className={isSmallScreen ? "hidden" : "justify-content-between "}>
                   {isLoggedIn && <Nav.Link onClick={Auth.logout}>Log Out</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/signup">Sign Up</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/login">Log In</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;

