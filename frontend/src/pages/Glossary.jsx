// src/pages/Glossary.jsx
import React, { useState, useEffect } from "react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchIngredients = async (query = "") => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const resp = await fetch(
          `http://localhost:3001/api/ingredients?q=${encodeURIComponent(query)}`
        );
        const data = await resp.json();
        setIngredients(data);
      } catch (e) {
        console.error("Fetch error:", e);
        setErrorMessage("Failed to load ingredients.");
        setIngredients([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm.trim()) {
      fetchIngredients(searchTerm);
    } else {
      setIngredients([]);
    }
  }, [searchTerm]);

  return (
    <div className="bg-pink-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-pink-500">
        🧴 Skincare Glossary
      </h1>
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul className="space-y-4">
          {ingredients.map((ing, index) => (
            <li key={index} className="bg-purple-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-purple-700">
                {ing.field2?.trim()}
              </h2>
              <p className="text-sm text-gray-700 mt-1">{ing.field7?.trim()}</p>
              <p className="text-sm text-pink-600 italic mt-1">
                {ing.field9?.trim()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Glossary;
