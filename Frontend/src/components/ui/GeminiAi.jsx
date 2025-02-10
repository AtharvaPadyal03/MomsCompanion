import React, { useState } from 'react';
import axios from '../../config/axios';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const GeminiAi = () => {
    const navigate = useNavigate();
    const [trimester, setTrimester] = useState('');
    const [diet, setDiet] = useState('');
    const [error, setError] = useState(''); // Separate state for error messages
    const [loading, setLoading] = useState(false);

    const formatText = (htmlText) => {
        if (!htmlText) return "";
        return htmlText
            .replace(/<br\s*\/?>/g, '\n')
            .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
            .replace(/<\/?[^>]+(>|$)/g, "");
    };  

    const handleGenerateDiet = async () => {

        setLoading(true);
        setDiet(''); // Clear previous diet result
        setError(''); // Clear previous error

        axios.post('/user/acceptPromptAndGenerateRecipies', { trimester })
        .then(response => {
            const formattedDiet = formatText(response.data.data);

            if (!formattedDiet.trim()) {
                throw new Error('Empty response from server'); // Handle empty response
            }

            setDiet(formattedDiet);
        })
        .catch(err => {
            navigate('/login');
            console.error('Error generating diet:', err);
            setError("Error generating diet. Please try again."); // Show error only
        })
        .finally(() => {
            setLoading(false);
        });

    };

    return (
        <div className="min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-white">
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('/food_bg.jpeg')] bg-cover bg-center bg-no-repeat">
                <h1 className="text-4xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, sans-serif' }}>
                    <p className="text-black">Generate a personalized diet plan!</p>
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
                    <div className="flex flex-col items-center">
                        <label className="block text-gray-700 text-l font-bold mb-2 text-center" htmlFor="trimester">
                            Enter Trimester:
                        </label>
                        <input
                            type="text"
                            id="trimester"
                            value={trimester}
                            onChange={(e) => setTrimester(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                            onClick={handleGenerateDiet}
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Diet'}
                        </button>
                    </div>

                    {/* Show error message if an error occurs */}
                    {error && (
                        <div className="mt-4 text-red-600 font-bold">{error}</div>
                    )}

                    {/* Show generated diet only when there is valid data */}
                    {diet && !error && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-2 text-black">Generated Diet:</h2>
                            <div className="text-gray-700">
                                <ReactMarkdown>{diet}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeminiAi;
