import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home";
import Glossary from "./pages/Glossary";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.jsx";
import Footer from "./components/Footer.jsx";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";
import SkinAnalyzer from "./pages/SkinAnalyzer.jsx";
import BeautyQuiz from "./pages/BeautyQuiz";
import Results from "./pages/Results.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analyzer" element={<SkinAnalyzer />} />
          <Route path="/quiz" element={<BeautyQuiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
