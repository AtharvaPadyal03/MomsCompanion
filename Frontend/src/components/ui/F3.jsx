import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";

const F3 = () => {
  const navigate = useNavigate();
  return (
    <div className='p-10' onClick={() =>{ navigate('/exercise')}}>
     <div className=" bg-gray-500 rounded-[22px] max-w-lg p-6 sm:p-12  dark:bg-zinc-900">
        <img 
          src="/e1.jpg" 
          alt="image" 
          className='rounded-md max-w-md ' 
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
        Exercises
        </p>
      </div>
    </div>
  );
};

export default F3;
