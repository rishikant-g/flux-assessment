import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { URLS } from "../common/constants/urls";
import { useLogout } from "../common/services/useAuth";
import { useEffect } from "react";
import { useAuth } from "../provider/authProvider";

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
      <Nav variant="tabs">
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
      </Nav>
    </>
  );
}

export default Header;
