import MainFeature from "@/components/ui/MainFeaturePage"
import Home from "../components/ui/HomePage"
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Exercise from "../components/ui/Exercise"
import Books from "../components/ui/Books"
import GeminiAi from "../components/ui/GeminiAi"
import MapComponent from "../components/ui/MapComponent"
import Login from "../components/ui/Login"
import RegisterUser from "../components/ui/RegisterUser"
import UserProfile from "../components/ui/UserProfile"
import UpdateProfile from "../components/ui/UpdateProfile"
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/sonography' element = {<MainFeature/>} />
        <Route path='/nearby-hospitals' element = {<MapComponent/>} />
        <Route path='/exercise' element = {<Exercise/>} />
        <Route path='/books' element = {<Books/>} />
        <Route path='/diet-plan' element = {<GeminiAi/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/RegisterUser' element={<RegisterUser/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/update-profile' element={<UpdateProfile/>}/>
    </Routes>
  )
}

export default AppRoutes