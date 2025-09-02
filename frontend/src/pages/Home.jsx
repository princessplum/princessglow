import Banner from "../components/Banner";
import GetStarted from "../components/GetStarted";
import HowItWorks from "../components/HowItWorks";
import ChatBot from "../components/chatbot";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-pink-50 flex flex-col items-center">
      <div className="w-full max-w-screen-xl px-8">
        <Header />
        <HeroSection />
        <GetStarted />
        <HowItWorks />
        <ChatBot />
      </div>
    </div>
  );
};

export default Home;
