import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  return (
    
    <div className="bg-[url('LandingPage.avif')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-end">
        <div className="leftbox h-full w-1/2 p-10">
            <span className='text-[#D14CCC] text-4xl font-bold comic-relief-bold'> 
            "You are growing a tiny miracle inside you, and every day you carry life with strength, love, and grace. Trust your body, believe in your journey—you are stronger than you think"
            </span>

            <div className='flex flex-col mt-10 items-center'>
                <span className='text-white text-2xl font-bold'> 
                    Welcome to <span className='text-[#D14CCC]'>MomsCompanion</span>! Your journey starts here.
                </span>
                <div className='flex gap-5 mt-5 justify-center'>
                    <Link
                    to="/login"
                    className='px-5 py-2 bg-[#C0C0F2] rounded-2xl hover:scale-105 hover:shadow-lg transition-transform duration-200 hover:bg-[#D8EAFA] inline-block text-center'
                    >
                    Login
                    </Link>
                    <Link
                    to="/RegisterUser"
                    className='px-5 py-2 bg-[#C0C0F2] rounded-2xl hover:scale-105 hover:shadow-lg transition-transform duration-200 hover:bg-[#D8EAFA] inline-block text-center'
                    >
                    Register
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
