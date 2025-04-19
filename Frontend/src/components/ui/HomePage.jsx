
import Countdown from '../Countdown';
import "@fontsource/jaro"
import Cookies from 'universal-cookie';
import F1 from './F1';
import F2 from './F2';
import F3 from './F3';
import F4 from './F4';
import MainF from './MainF';
import Navbar from './Navbar';



const HomePage=()=> {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const isLoggedIn = Boolean(accessToken);
  

  return (
    <div className=" min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-white ">
      <Navbar/> 
          <div className="p-8 bg-transparent shadow-2xl rounded-lg mt-12 mx-auto w-11/12 md:w-2/3">
        {isLoggedIn ? (
          <Countdown />
        ) : (
        <div className="h-[8rem] relative w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-4xl font-bold text-center text-white relative z-20">
              
                  Embrace your 
                  <br />
                  journey with <span className="text-white bg-clip-text">Mom's Companion!</span>
            </h1>
        </div>
         
        )}
     </div>
       <MainF/>
     <div>

     </div>
     <div className='pl-5 pr-5 flex justify-center mt-20' >
    <F1/>
    <F2/>
</div>

<div className='pl-5 pr-5 flex justify-center mt-20' >
  <F3/>
  <F4/>
  </div> 
 </div>
   );
}

export default HomePage;

