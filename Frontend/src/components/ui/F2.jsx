import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";
const F2 = () => {
  const navigate = useNavigate();
  return (

    <div className='p-5' onClick={() =>{ navigate("/diet-plan")}}>
      <BackgroundGradient className="rounded-[22px] max-w-lg p-6 sm:p-12 bg-transparent dark:bg-zinc-900">
        <img 
          src="/diet-plans-1.jpg" 
          alt="image" 
          className='rounded-md max-w-sm justify-center' 
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
         Personalized Diet Plan
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default F2;
