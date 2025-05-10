import { useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const MainF = () => {
  const navigate = useNavigate();
  return (
    <div className=' flex justify-center items-center min-h-screen' onClick={(e)=>{navigate('/sonography')}}>

      <div className="rounded-[22px] max-w-xl p-4 sm:p-6  dark:bg-transparent flex flex-col items-center text-center shadow-2xl bg-opacity-50 backdrop-blur-md">
        <img 
          src="https://media.istockphoto.com/id/1344779469/photo/asian-pregnant-couple-feeling-happy-show-ultrasound-image-at-home-focus-on-ultrasound-image.jpg?s=612x612&w=0&k=20&c=_s3ESLs_CEjnAwQnaTMOpKwNieEfv7YlHeZXIyx2NEg=" 
          alt="image" 
          className='rounded-md w-full' 
        />
        <p className="text-base text-2xl sm:text-lg text-black mt-4 mb-2 font-bold">
        Track Your Baby’s Growth with Smart Insights!
        </p>
      </div>
    </div>
  );
};

export default MainF;
