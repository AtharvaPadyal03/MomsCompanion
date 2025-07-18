import Countdown from "../Countdown";
import "@fontsource/jaro";
import Cookies from "universal-cookie";
import MainF from "./MainF";
import Navbar from "./Navbar";
import FeatureCard from "./FeatureCard";


const HomePage = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const isLoggedIn = Boolean(accessToken);

  return (
    <div className=" min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat text-white ">
      <Navbar />
      <div className="p-8 bg-transparent shadow-2xl rounded-lg mt-12 mx-auto w-11/12 md:w-2/3">
        {isLoggedIn ? (
          <Countdown />
        ) : (
          <div className="h-[8rem] relative w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-4xl font-bold text-center text-white relative z-20">
              Embrace your
              <br />
              journey with{" "}
              <span className="text-white bg-clip-text">Mom's Companion!</span>
            </h1>
          </div>
        )}
      </div>
      
      <MainF />
      
      
      <div className="flex flex-wrap justify-center gap-20 py-5">
        <FeatureCard title="Hospital" image="/hp2.jpg" route="/nearby-hospitals" />
        <FeatureCard title="Diet Plans" image="/diet-plans-1.jpg" route="/diet-plan" />
        <FeatureCard title="Exercises" image="/e1.jpg" route="/exercise" />
        <FeatureCard title="Books" image="/books.jpg" route="/books" />
      </div>
      
    </div>
  );
};

export default HomePage;
