import  { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../common/utils/util";

const PublicLayout = () => {
  const token = getToken();
  console.log("TOKEN>>>>", token);
  if (token) {
    return <Navigate to="/task" replace />;
  }
  return (
    <div className="mx-container pre-login">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
