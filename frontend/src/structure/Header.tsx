import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../common/utils/util";
import { URLS } from "../common/constants/urls";
import { useLogout } from "../common/services/useAuth";
import { useEffect } from "react";

function Header() {

  const token = getToken();
  const { mutate, isSuccess } = useLogout(URLS.LOGOUT);
  const navigate = useNavigate();
  // const 
  const handleLogout = () => {
    mutate(token);
    removeToken();
  };

  useEffect(() => {
    if(isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate])
  
  return (
    <>
      <Nav variant="tabs">
        {!token && (
          <>
            <Nav.Item className="mx-5">
              <Link to="/">Login</Link>
            </Nav.Item>
            <Nav.Item className="mx-5">
              <Link to="/register">Register</Link>
            </Nav.Item>
          </>
        )}
        {token && (
          <Nav.Item className="mx-5">
            <button onClick={handleLogout}>Logout</button>
          </Nav.Item>
        )}
      </Nav>
    </>
  );
}

export default Header;
