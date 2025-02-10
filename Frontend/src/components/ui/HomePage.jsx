import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Countdown from '../Countdown';
import { FlipWords } from './flip-words';
import { SparklesCore } from './sparkles';
import "@fontsource/jaro"
import { BackgroundGradient } from './background-gradient';
import { IconAppWindow } from "@tabler/icons-react";
import F1 from './F1';
import F2 from './F2';
import F3 from './F3';
import F4 from './F4';
import MainF from './MainF';
import Navbar from './Navbar';
import { TypewriterEffectSmooth } from './typewriter-effect';


const HomePage=()=> {
  const words = ["STRONG", "GLOWING", "NURTURING", "AMAZING"];
  const isLoggedIn = false;
  return (
    <div className=" min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-white ">
      <Navbar/> 
          <div className="p-8 bg-transparent shadow-2xl rounded-lg mt-12 mx-auto w-11/12 md:w-2/3">
        {isLoggedIn ? (
          <Countdown />
        ) : (
          <div className="h-[8rem] relative w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="w-full absolute inset-0 h-screen bg-colors-purple1">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-white relative z-20">
            
          Embrace your <span className='text-white'><FlipWords words={words} className="text-pink-600" /></span>
<br />
journey with <span className="text-white bg-clip-text">Mom's Companion!</span>
          </h1>
        </div>
         
        )}
     </div>
       <MainF />
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
 {/* <MainFeature/> */}
  {/* <Books/> */}
  {/* <Exercise/> */}
  {/* <Hospital/> */}
 </div>
   );
}

export default HomePage;

