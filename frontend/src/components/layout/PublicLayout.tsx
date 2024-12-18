import { Outlet } from "react-router-dom";
// import { useAuth } from "../../provider/authProvider";

const PublicLayout = () => {
  // const authCtx = useAuth();
  // if (authCtx.isLoggedIn) {
  //   return <Navigate to="/task" replace />;
  // }
  return (
    <div className="mx-container pre-login">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
