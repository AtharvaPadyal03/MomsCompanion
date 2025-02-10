import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";

const F1 = () => {
  const navigate = useNavigate();
  return (
    <div className='p-5' onClick={() =>{ navigate("/nearby-hospitals")}}>
      <BackgroundGradient className="rounded-[22px] max-w-lg p-6 sm:p-12 bg-transparent dark:bg-zinc-900">
        <img 
          src="/hp2.jpg" 
          alt="image" 
          className='rounded-md max-w-sm ' 
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
        Nearby Maternity Hospitals
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default F1;
