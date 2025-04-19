import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import Navbar from './Navbar';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedTrimester, setSelectedTrimester] = useState(1);
  const [isModalClosed, setIsModalClosed] = useState(true);
  const [clickedExercise, setClickedExercise] = useState({});

  useEffect(() => {
    axios.get('/exercise/fetchAllExercise')
      .then(res => {
        setExercises(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filtered = exercises.filter(ex => Number(ex.trimester) === selectedTrimester);
    setFilteredExercises(filtered);
  }, [selectedTrimester, exercises]);

  const handleClose = () => {
    setIsModalClosed(!isModalClosed);
  };

  return (
    <div className="min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        
        {/* Trimester Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3 , 4].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedTrimester(num)}
              className={`px-6 py-2 rounded-lg font-semibold border border-white transition duration-200
                ${selectedTrimester === num ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-200'}`}
            >
              Trimester {num}
            </button>
          ))}
        </div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isModalClosed && filteredExercises.map((exercise, index) => (
            <div key={index} onClick={() => {
              handleClose();
              setClickedExercise(exercise);
            }}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
              <img src={exercise.url} alt={`${exercise.name} image`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl text-black font-bold">{exercise.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {!isModalClosed && (
          <div className='bg-blue-600 min-h-96 w-[60%] mx-auto mt-20 p-5 rounded-lg'>
            <div className='h-5 rounded-md items-center flex justify-end'>
              <button className='bg-red-600 px-4 rounded-md' onClick={handleClose}>Close</button>
            </div>

            <div className='min-h-96 flex w-[97%] gap-3 mx-auto'>
              <div className='left bg-orange-300 rounded-md w-[50%] flex items-center justify-center p-4'>
                <div className='bg-gray-600 h-[70%] w-[90%] mt-5 rounded-lg'>
                  <img src={clickedExercise.url} alt={`${clickedExercise.name} image`} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className='right bg-orange-300 w-[50%] flex flex-col gap-4 rounded-md p-4'>
                <h1 className='text-3xl h-12'>{clickedExercise.name}</h1>
                <p>Description: {clickedExercise.description}</p>
                <p>Repetitions: {clickedExercise.repetition}</p>
                <p>Sets: {clickedExercise.sets}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
