import Header from "../structure/Header";
import MainContainer from "../structure/MainContainer";
import Footer from "../structure/Footer";
import "./../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
};

export default Home;
