import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        toast.error(JSON.stringify(data));
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 hc:bg-black transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 hc:bg-black hc:border-2 hc:border-white shadow-lg rounded-lg p-8 w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white hc:text-yellow-300 mb-6">
          Register
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 hc:border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white hc:bg-black hc:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 hc:border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white hc:bg-black hc:text-white"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600 hc:bg-black hc:border hc:border-white hc:hover:bg-gray-900 transition"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 hc:text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 dark:text-blue-400 hc:text-yellow-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
