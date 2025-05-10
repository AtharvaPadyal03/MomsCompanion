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
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedTrimester(num)}
              className={`px-4 py-2 text-sm sm:text-base rounded-lg font-semibold border border-white transition duration-200
                ${selectedTrimester === num ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-200'}`}
            >
              Trimester {num}
            </button>
          ))}
        </div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isModalClosed && filteredExercises.map((exercise, index) => (
            <div
              key={index}
              onClick={() => {
                handleClose();
                setClickedExercise(exercise);
              }}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img src={exercise.url} alt={`${exercise.name} image`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg sm:text-xl text-black font-bold">{exercise.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {!isModalClosed && (
          <div className="bg-slate-300 w-full sm:w-[90%] lg:w-[70%] mx-auto mt-10 p-4 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8">
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-slate-400 rounded-md w-full md:w-1/2 flex items-center justify-center p-4">
                <div className="bg-gray-600 w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                  <img src={clickedExercise.url} alt={`${clickedExercise.name} image`} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-slate-400 w-full md:w-1/2 flex flex-col gap-4 rounded-md p-4">
                <h1 className="text-xl sm:text-2xl text-center font-bold border-2 border-slate-900 py-2">{clickedExercise.name}</h1>
                <p className="text-sm sm:text-base">Description: {clickedExercise.description}</p>
                <p className="text-base sm:text-lg font-semibold">Repetitions: {clickedExercise.repetition}</p>
                <p className="text-base sm:text-lg font-semibold">Sets: {clickedExercise.sets}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Exercise;
