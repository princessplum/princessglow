import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        // Redirect if not logged in
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/signin");
  };

  if (!user) return null; // or loading spinner

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Account</h1>
        <p className="text-gray-700 mb-6">
          Signed in as: <strong>{user.email}</strong>
        </p>

        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
