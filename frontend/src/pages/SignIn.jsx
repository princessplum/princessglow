import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Signed in!", data);
      navigate("/"); // or wherever your home/profile page is
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-pink-500 hover:underline font-medium mt-1"
          >
            Create one here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
