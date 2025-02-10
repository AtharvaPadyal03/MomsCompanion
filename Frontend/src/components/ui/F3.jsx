import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";

const F3 = () => {
  const navigate = useNavigate();
  return (
    <div className='p-10' onClick={() =>{ navigate('/exercise')}}>
     <BackgroundGradient className="rounded-[22px] max-w-lg p-6 sm:p-12 bg-transparent dark:bg-zinc-900">
        <img 
          src="/e1.jpg" 
          alt="image" 
          className='rounded-md max-w-md ' 
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
        Exercises
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default F3;
