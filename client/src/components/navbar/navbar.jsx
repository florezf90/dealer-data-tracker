import { Navbar, Nav, Container } from "react-bootstrap";
import CustomDropdown from "../dropdown/dropdown";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "./CustomNavbar.css";

const MainNavbar = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    if (location.pathname === "/") {
      handleResize();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

    const dropdownTitle = "Menu";
  const dropdownOptions = [
    { label: "Features", href: "#features" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];

    if (isLoggedIn) {
    dropdownOptions.push({ label: "Dashboard", href: "/dashboard" });
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {isSmallScreen && (
<CustomDropdown
            title={dropdownTitle}
            options={location.pathname === "/" ? dropdownOptions : dropdownOptions.slice(1)}
          />
        )}

        <Navbar.Brand as={Link} to="/">go home</Navbar.Brand>
        <Nav className={isSmallScreen ? "mr-auto hidden" : "mr-auto"}>
          {location.pathname !== "/about-us" &&
            location.pathname !== "/contact-us" && (
              <Nav className={isSmallScreen ? "mr-auto hidden" : "mr-auto"}>
                <Nav.Link href="#features"> Features</Nav.Link>
              </Nav>
            )}
          {location.pathname !== "/about-us" && (
            <Nav.Link href="/about-us">About Us</Nav.Link>
          )}
          {location.pathname !== "/contact-us" && (
            <Nav.Link className="nav-link" href="/contact-us">Contact Us</Nav.Link>
          )}
        </Nav>
        <Nav className={isSmallScreen ? "hidden" : "justify-content-between "}>
          {isLoggedIn && (
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={Auth.logout}>Log Out</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/signup">Sign Up</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/login">Log In</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;