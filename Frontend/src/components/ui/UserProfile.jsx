import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../config/axios";

const ProfilePopup = ({ onClose }) => {
const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("/user/getUser")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
        >
          <img className="w-10" src="/close.png" alt="" />
        </button>
        
        <div className="flex flex-row items-center justify-center gap-6">
          <img src={userData.avatar} alt="" className="w-24 h-16 bg-gray-300 rounded-full flex items-center justify-center" />
            <div className="w-full">
                    <div className="mb-2 flex gap-2 text-sm font-semibold">
                    <span className="text-gray-600">Name:</span>
                    <p className="text-gray-800">{userData.username}</p>
                    </div>
                    <div className="mb-2 flex gap-2 text-sm font-semibold">
                    <span className="text-gray-600">Email:</span>
                    <p className="text-gray-800">{userData.email}</p>
                    </div>
                    <div className="mb-2 flex gap-2 text-sm font-semibold">
                    <span className="text-gray-600">Age:</span>
                    <p className="text-gray-800">{userData.age}</p>
                    </div>
                    <div className="mb-2 flex gap-2 text-sm font-semibold">
                    <span className="text-gray-600">Weight:</span>
                    <p className="text-gray-800">{userData.weight}</p>
                    </div>
            </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-col gap-4 justify-center items-center">
          <span className="hover:bg-red-500 rounded-xl px-2 bg-red-300 cursor-pointer text-black">Logout</span>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
          <span className="hover:bg-red-500 rounded-xl px-2 bg-red-300 cursor-pointer text-black">Update Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;