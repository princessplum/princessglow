import React, { useState } from "react";

const SkinAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze_skin", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Skin Analyzer</h1>

      <div className="mb-4">
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-white border border-pink-500 text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-pink-50 transition duration-200 inline-block"
        >
          Choose Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!image || loading}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Skin"}
      </button>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-48 h-auto mt-4 rounded-lg shadow"
        />
      )}

      <button
        onClick={() => (window.location.href = "/quiz")}
        className="cursor-pointer bg-white border border-pink-500 text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-pink-50 transition duration-200 mt-2"
      >
        Skip and take the quiz instead →
      </button>

      {results && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Detected Concerns:
          </h2>

          <ul className="text-pink-500 font-medium">
            {results.skin_concerns.map((concern, i) => (
              <li key={i}>
                • {concern.label} — {Math.round(concern.confidence * 100)}%
              </li>
            ))}
          </ul>

          {results.top_concerns && results.top_concerns.length > 0 && (
            <div className="mt-4">
              <p className="text-pink-600 font-medium mb-2">Top Concerns:</p>
              <ul className="text-pink-600">
                {results.top_concerns.map((label, i) => (
                  <li key={i}>• {label}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => (window.location.href = "/quiz")}
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Continue to Beauty Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default SkinAnalyzer;
