import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routine = location.state?.routine || "";

  if (!routine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          Oops! No routine found 💔
        </h1>
        <button
          onClick={() => navigate("/quiz")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Go Back to Quiz
        </button>
      </div>
    );
  }

  // If the LLM returned JSON, try parsing it
  let parsedRoutine = null;
  try {
    parsedRoutine = JSON.parse(routine);
  } catch {
    parsedRoutine = null;
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Your Personalized Skincare Routine ✨
        </h1>

        {parsedRoutine && parsedRoutine.routine ? (
          <>
            <p className="text-gray-700 mb-6 italic">
              {parsedRoutine.skin_summary || "Your custom skincare plan."}
            </p>

            <div className="space-y-4">
              {parsedRoutine.routine.map((step, idx) => (
                <div
                  key={idx}
                  className="border border-pink-200 rounded-lg p-4 shadow-sm"
                >
                  <h2 className="text-xl font-semibold text-pink-500 mb-1">
                    {step.step}{" "}
                    <span className="text-sm text-gray-500">({step.time})</span>
                  </h2>
                  <p className="text-gray-700 mb-2">{step.instructions}</p>

                  {step.example_ingredients?.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Key Ingredients:</span>{" "}
                      {step.example_ingredients.join(", ")}
                    </p>
                  )}

                  {step.example_products?.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Example Products:</span>{" "}
                      {step.example_products.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {parsedRoutine.cautions?.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <h3 className="font-semibold text-yellow-700">Cautions</h3>
                <ul className="list-disc list-inside text-yellow-700">
                  {parsedRoutine.cautions.map((caution, i) => (
                    <li key={i}>{caution}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <pre className="whitespace-pre-wrap text-gray-700">{routine}</pre>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
