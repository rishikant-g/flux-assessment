import Header from "../structure/Header";
import MainContainer from "../structure/MainContainer";
import Footer from "../structure/Footer";
import "./../styles/home.css";
import { getToken } from "../common/utils/util";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  if (token) {
    navigate("/task");
  }
  return (
    <div className="wrapper">
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
};

export default Home;
