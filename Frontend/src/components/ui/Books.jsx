import React,{useEffect, useState} from 'react';
import axios from '../../config/axios';
import { Link,useNavigate} from 'react-router-dom';
import Navbar from './Navbar';



const Books = () => {
    const [books,setBooks] = useState([]);

    useEffect( ()=>{
        axios.get('/book/fetchBooks')
        .then(async(res)=>{
            setBooks(res.data.data)
            console.log(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        console.log(books)
    },[books])
    
        

  return (
    <div className="min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-white">
      <Navbar />
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div onClick={() => window.open(book.url, "_blank")} // Opens the book in a new tab
            key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={book.coverimage} alt={`${book.name} cover`} className="w-full h-60 object-cover" />  
              <div className="p-4">
                <h2 className="text-blue-500 text-xl font-bold">{ book.name}</h2>
                <p className="text-gray-700">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Books;
