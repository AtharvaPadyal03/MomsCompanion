import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import Cookies from "universal-cookie";
import spinner from "../../assets/loading.png"; // ✅ Import your spinner here

const RegisterUser = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    axios.post('/user/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        const token = res.data.data.accessToken;
        cookies.set("accessToken", token, { path: "/" });
        navigate('/home');
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 px-5 py-3 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white">Register</h2>

        <div className="mb-2">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your email'
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your username'
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your age'
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Weight</label>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your weight'
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Height</label>
          <input
            type="number"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your height'
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            required
            placeholder='Enter your password'
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && (
            <img
              src={spinner}
              alt="Loading..."
              className="w-5 h-5 animate-spin"
            />
          )}
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm mt-3 text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterUser;
