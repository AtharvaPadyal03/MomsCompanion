import React from 'react';
import Navbar from './Navbar'
import {useState,useEffect} from 'react'
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate()
  const [avatar,setAvatar] = useState('')
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [allergies, setAllergies] = useState([]);

  useEffect(()=>{
      axios.get('/user/getUser')
      .then((res)=>{
        setAvatar(res.data.data.avatar)
        setAge(res.data.data.age)
        setWeight(res.data.data.weight)
        setHeight(res.data.data.height)
        setAllergies(res.data.data.allergies)
      }).catch((err)=>{
        console.log(err)
      })
  },[])

  const handleSumbitText = (e)=>{
    
    e.preventDefault()
    if(age!='' && weight!='' && height!=''){
      axios.patch('/user/updateAccountDetailsTextBased',{age,weight,height})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      })
    }

    axios.patch('/user/acceptAllergiesAndMedicalCondition',{allergies})
    .then((res) => {
      console.log(res.data)
      navigate('/')
    })
    .catch((err) => {
      console.log(err.response.data);
    })
  }

  const handleSumbitAvatar = (e)=>{
    e.preventDefault()
    axios.patch('/user/updateUserAvatar',{avatar},{headers: { 'Content-Type': 'multipart/form-data' }})
    .then((res) => {
      console.log(res.data)
      navigate('/')
    })
    .catch((err) => {
      console.log(err.response.data);
    })
  }

  return (
    <>
      <Navbar/>
      
      <div className="w-full bg-red-400 h-[7vh] flex items-center justify-center text-xl font-semibold border-b-2 border-blue-600">
        <p>Update Your Profile</p>
      </div>
      <div className='flex justify-center items-center mt-[23px]'>
          <div className=" max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mt-5 flex justify-center">
            <div className="w-1/3 bg-blue-200 flex flex-col items-center py-5 border-r-2 border-blue-600">
              <img
                className="rounded-full h-40 w-40 object-cover"
                src={avatar}
                alt="Profile"
              />
            <form onSubmit={handleSumbitAvatar} className='flex flex-col mt-5 ml-5 mr-5'>
                <input 
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="w-full mr-[10px] mb-3 px-3 py-2 bg-gray-400 rounded-lg focus:outline-none hover:ring-2 hover:ring-gray-200 hover:shadow-xl hover:shadow-slate-400 text-white"/>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Update Profile</button>
            </form>
            </div>

            <div className="w-2/3 p-6">
              <form onSubmit={handleSumbitText} className="grid grid-cols-1 gap-4">

                <div>
                  <label className="block text-gray-700 font-medium">Age:</label>
                  <input type="number" className="hover:shadow-xl hover:shadow-slate-200 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" value={age} onChange={e=>setAge(e.target.value)}/>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Weight (kg):</label>
                  <input type="number" className="hover:shadow-xl hover:shadow-slate-200 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" value={weight} onChange={e=>setWeight(e.target.value)} />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Height (cm):</label>
                  <input type="number" className="hover:shadow-xl hover:shadow-slate-200 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" value={height} onChange={e=>setHeight(e.target.value)} />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Allergies:</label>
                  <input type="text" className="hover:shadow-xl hover:shadow-slate-200 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Enter allergies if any" onChange={e=>setAllergies(e.target.value)} />
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Update Profile</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </>
  );
};

export default UpdateProfile;
