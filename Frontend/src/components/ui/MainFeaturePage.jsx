import { useState } from 'react';
import "@fontsource/jaro"
import Navbar from './Navbar';
import axios from '../../config/axios';

import { TypewriterEffectSmooth } from './typewriter-effect';

const MainFeature = () => {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(); 

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      console.log('File:', file);
      formData.append("img", file);

      console.log('File submitted:', file);
      
      try {
        const response = await axios.post('/classify', formData);
        setRes(response.data.predicted_class);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('No file selected');
    }
  };

  

  return (
    <div className="min-h-screen bg-colors-purple2 text-white  bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat ">

      <Navbar />
      <div className="p-8 bg-colors-purple1 text-white shadow-2xl rounded-lg mt-12 mx-auto w-11/12 md:w-2/3">
       <p className='font-bold  text-lg text-center'>Curious about your little one’s progress? <br />Let’s checkout how your baby’s growing!
       </p>
      </div>

      <div className="w-full mt-5 max-w-xl mx-auto justify-center min-h-10 border border-dashed bg-colors-purple1 dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <div className='p-10'>
          <form onSubmit={handleSubmit} className='flex gap-10 items-center'>
            <input onChange={handleFileChange} className='bg-pink-400 rounded-md p-5' type="file" name='img' />
            <button className='bg-blue-600 hover:bg-blue-700 px-7 rounded-md py-2' type="submit">Submit</button>
          </form>
        </div>
      </div>


      {res &&
        (<div className='mt-6  min-h-40 flex items-center justify-center'>
        <div className='bg-green-400 min-w-80 rounded-md p-5'>

          <p className='text-black'>Growth of your baby's brain seems <span className='font-bold text-lg'>{res}</span></p>
          
        </div>
      </div>)
      }
    </div>
  );
}

export default MainFeature;
