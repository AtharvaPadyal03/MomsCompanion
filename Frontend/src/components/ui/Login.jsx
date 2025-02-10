import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Cookies from "universal-cookie";

const Login = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        const token = res.data.data.accessToken;
        cookies.set("accessToken", token, { path: "/" });
        navigate("/");
        setError(false); 
      })
      .catch((err) => {
        setError(true);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium">Email</label>
            <input
              type="email"
              className={`w-full mt-1 px-3 py-2 bg-gray-700 border ${error ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium">Password</label>
            <input
              type="password"
              className={`w-full mt-1 px-3 py-2 bg-gray-700 border ${error ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">Invalid email or password</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/RegisterUser" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
