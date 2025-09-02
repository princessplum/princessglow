import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user on mount
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    getUser();

    // Listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-slate-100 text-gray-400 shadow sticky w-full top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span
            style={{ fontFamily: "Lovera" }}
            className="text-2xl font-bold tracking-wide"
          >
            PrincessGlow
          </span>
        </div>

        {/* Navigation Links aligned right */}
        <div className="ml-auto space-x-6 flex items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/glossary" className="hover:underline">
            Glossary
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>

          {/* Auth-based button */}
          {user ? (
            <div className="relative group">
              <Link to="/profile" className="hover:underline font-medium">
                Account
              </Link>
            </div>
          ) : (
            <Link to="/signin" className="hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
