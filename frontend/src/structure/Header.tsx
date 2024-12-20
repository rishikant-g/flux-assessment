import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { URLS } from "../common/constants/urls";
import { useLogout } from "../common/services/useAuth";
import { useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import { Button, Container, Navbar } from "react-bootstrap";

function Header() {
  const authCtx = useAuth();

  const { mutate, isSuccess } = useLogout(URLS.LOGOUT);
  // const navigate = useNavigate();

  const handleLogout = () => {
    mutate(authCtx.token);
  };

  useEffect(() => {
    if (isSuccess) {
      authCtx.logout();
    }
  }, [isSuccess]);

  return (
    <>
      {/* <Nav variant="tabs">
        {!authCtx.isLoggedIn && (
          <>
            <Nav.Item className="mx-5">
              <Link to="/">Login</Link>
            </Nav.Item>
            <Nav.Item className="mx-5">
              <Link
                to="/register"
                onClick={() => console.log("Navigating to Register")}
              >
                Register
              </Link>
            </Nav.Item>
          </>
        )}
        {authCtx.isLoggedIn && (
          <Nav.Item className="mx-5">
            <button onClick={handleLogout}>Logout</button>
          </Nav.Item>
        )}
      </Nav> */}

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/">Flux</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
              {!authCtx.isLoggedIn && (
                <>
                  <Nav.Link className="mx-5">
                    <Link to="/">Login</Link>
                  </Nav.Link>
                  <Nav.Link className="mx-5">
                    <Link to="/register">Register</Link>
                  </Nav.Link>
                </>
              )}
              {authCtx.isLoggedIn && (
                <Nav.Link className="mx-5">
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
