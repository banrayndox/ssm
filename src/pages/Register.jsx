// Register.jsx
import React, { useState } from "react";
import { NavLink } from "react-router";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // minimal register logic
    onRegister(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <label className="block mb-2 text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-gray-700">DIU Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
        >
          Register
        </button>
                    <div className="flex space-x-5 pt-7 items-center">
        <span className="text-xs text-gray-600">Already have an account?</span> 
        <NavLink to='/' className="text-xs bg-black text-white rounded-lg px-3 py-1 hover:text-gray-800 hover:bg-gray-200 transition active:scale-x-95">Login</NavLink>
        </div>
      </form>
  
    </div>
  );
};

export default Register;
