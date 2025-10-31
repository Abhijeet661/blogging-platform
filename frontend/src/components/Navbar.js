import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = JSON.parse(localStorage.getItem("user"))?.name;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-blue-600">Blogging Platform</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700">Home</Link>
          {token ? (
            <>
              <Link to="/new" className="bg-blue-600 text-white px-3 py-1 rounded">New Post</Link>
              <span className="text-gray-700">Hi, {name}</span>
              <button onClick={logout} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700">Login</Link>
              <Link to="/register" className="text-gray-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}