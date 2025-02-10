import { useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const MainF = () => {
  const navigate = useNavigate();
  return (
    <div className=' flex justify-center items-center min-h-screen' onClick={(e)=>{navigate('/sonography')}}>
    
      

      <BackgroundGradient className="rounded-[22px] max-w-xl p-4 sm:p-6 bg-transparent dark:bg-zinc-900 flex flex-col items-center text-center">
        <img 
          src="https://media.istockphoto.com/id/1344779469/photo/asian-pregnant-couple-feeling-happy-show-ultrasound-image-at-home-focus-on-ultrasound-image.jpg?s=612x612&w=0&k=20&c=_s3ESLs_CEjnAwQnaTMOpKwNieEfv7YlHeZXIyx2NEg=" 
          alt="image" 
          className='rounded-md w-full' 
        />
        <p className="text-base sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
        Track Your Baby’s Growth with Smart Insights!
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default MainF;
