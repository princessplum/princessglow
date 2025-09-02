import React from "react";

const steps = [
  {
    title: "1. Take the Beauty Quiz",
    image: "/img/quiz.jpg", // Replace with actual image path
    description:
      "Answer a few fun questions to tell us about your skin type, concerns, and goals.",
  },
  {
    title: "2. Upload a Selfie (Optional)",
    image: "/img/selfie.jpg", // Replace with actual image path
    description:
      "Want a more personalized routine? Add a selfie to let AI analyze your skin.",
  },
  {
    title: "3. AI Analysis",
    image: "/img/ai-analysis.jpg", // Replace with actual image path
    description:
      "Our AI reviews your responses and image to detect skincare needs and conditions.",
  },
  {
    title: "4. Get Your Routine",
    image: "/img/routine.jpg", // Replace with actual image path
    description:
      "We’ll recommend products that suit your skin—like a bestie who knows skincare!",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-pink-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-pink-200 transition-shadow"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-pink-500 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
