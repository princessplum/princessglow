import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 text-center bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Ready to discover your perfect routine?
      </h2>
      <p className="text-gray-600 mb-6">
        Our AI will analyze your skin and build a skincare plan just for you.
      </p>
      <button
        onClick={() => navigate("/analyzer")}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow transition"
      >
        💖 Get Your Routine
      </button>
    </section>
  );
};

export default GetStarted;
