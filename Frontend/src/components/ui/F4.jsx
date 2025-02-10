import { BackgroundGradient } from "./background-gradient";
import { useNavigate } from "react-router-dom";

const F4 = () => {
  const navigate = useNavigate();
  return (
    <div className='p-10' onClick={(e)=>{
      navigate('/books')
    }}>
      <BackgroundGradient className="rounded-[22px] max-w-lg p-6 sm:p-12 bg-transparent dark:bg-zinc-900 justify-center">
        <img 
          src="/books.jpg" 
          alt="image" 
          className='rounded-md max-w-sm' 
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
          Books
        </p>
        
      </BackgroundGradient>
    </div>
  );
};

export default F4;
