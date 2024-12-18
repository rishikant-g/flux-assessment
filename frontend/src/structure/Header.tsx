import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Nav variant="tabs" defaultActiveKey="/login">
      <Nav.Item>
        <Link to="/">Login</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/register">Register</Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
