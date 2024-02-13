/* eslint-disable react/prop-types */

import { NavDropdown } from "react-bootstrap";
import Auth from "../../utils/auth";

function CustomDropdown({ title, options }) {
  const handleLogout = () => {
    Auth.logout();
  };
  return (
    <NavDropdown title={title} id="basic-nav-dropdown"style={{ color: "black" }}>
      {options.map((option, index) => (
        <NavDropdown.Item key={index} href={option.href}>
          {option.label}
        </NavDropdown.Item>
      ))}
      {!Auth.loggedIn() && (
        <>
          <NavDropdown.Item href="/login">Log-in</NavDropdown.Item>
          <NavDropdown.Item href="/Signup">Sign-up</NavDropdown.Item>
        </>
      )}
      {Auth.loggedIn() && (
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      )}
    </NavDropdown>
  );
}

export default CustomDropdown;
