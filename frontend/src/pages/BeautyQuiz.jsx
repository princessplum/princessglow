import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router

const BeautyQuiz = () => {
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [skincareGoals, setSkincareGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Prepare quiz data for backend
      const quizResults = [
        { question: "Skin Types", answer: skinTypes.join(", ") },
        { question: "Skin Concerns", answer: skinConcerns.join(", ") },
        { question: "Skincare Goals", answer: skincareGoals.join(", ") },
      ];

      // Send to backend
      const res = await fetch("http://localhost:8000/generate_routine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_results: quizResults }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();

      // Navigate to results page and pass routine
      navigate("/results", { state: { routine: data.routine } });
    } catch (error) {
      console.error("Failed to get routine:", error);
      alert("Sorry, something went wrong generating your routine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Beauty Quiz 💖</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        {/* Question 1 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          What’s your skin type? (Choose all that apply)
        </h2>
        {["Dry", "Oily", "Combination", "Sensitive", "Normal"].map((type) => (
          <label key={type} className="block mb-3">
            <input
              type="checkbox"
              value={type}
              checked={skinTypes.includes(type)}
              onChange={() =>
                handleCheckboxChange(type, skinTypes, setSkinTypes)
              }
              className="mr-2 accent-pink-500"
            />
            {type}
          </label>
        ))}

        {/* Question 2 */}
        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
          What are your skin concerns? (Choose all that apply)
        </h2>
        {[
          "Acne",
          "Dark spots",
          "Wrinkles",
          "Redness",
          "Dry patches",
          "Oiliness",
          "Dullness",
          "Large pores",
          "Sensitivity",
        ].map((concern) => (
          <label key={concern} className="block mb-3">
            <input
              type="checkbox"
              value={concern}
              checked={skinConcerns.includes(concern)}
              onChange={() =>
                handleCheckboxChange(concern, skinConcerns, setSkinConcerns)
              }
              className="mr-2 accent-pink-500"
            />
            {concern}
          </label>
        ))}

        {/* Question 3 */}
        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
          What are your skincare goals? (Choose all that apply)
        </h2>
        {[
          "Hydration",
          "Brightening",
          "Soothing irritation",
          "Anti-aging",
          "Oil control",
          "Clear acne",
          "Even skin tone",
          "Plump skin",
        ].map((goal) => (
          <label key={goal} className="block mb-3">
            <input
              type="checkbox"
              value={goal}
              checked={skincareGoals.includes(goal)}
              onChange={() =>
                handleCheckboxChange(goal, skincareGoals, setSkincareGoals)
              }
              className="mr-2 accent-pink-500"
            />
            {goal}
          </label>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? "Generating..." : "See Results"}
        </button>
      </form>
    </div>
  );
};

export default BeautyQuiz;
