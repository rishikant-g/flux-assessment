import { useNavigate } from "react-router-dom";

function Fallback() {
  const navigate = useNavigate();

  return (
    <>
      <p className="text-center">We are sorry about this, please try again.</p>
      <button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Go back
      </button>
    </>
  );
}

export default Fallback;
