import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import UserProfile from "./UserProfile";
import axios from "../../config/axios";

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const accessToken = cookies.get("accessToken");
  const [showProfile, setShowProfile] = useState(false);
  const [avatar,setAvatar] = useState('')

  useEffect(()=>{
    axios.get('/user/getUser')
    .then((res)=>{
      setAvatar(res.data.data.avatar)
    }).catch((err)=>{
      console.log(err)
    })
},[])


  return (
    <>
    <nav className="bg-colors-purple1 text-white flex items-center justify-between px-6 py-4 shadow-lg">
      <div onClick={() => navigate("/home")}>
        <img src="./logo.png" alt="image" className="max-w-10" />
      </div>

      <h1 className="hidden sm:block text-4xl font-bold text-white text-shadow-xl absolute left-1/2 transform -translate-x-1/2">
        <span className="font-jaro">mom'sCompanion</span>
      </h1>


      <div className="flex items-center gap-4">
        {!accessToken ? (
          <div className="flex items-center gap-2 text-lg text-white">
            <span onClick={() => navigate("/login")} className="hover:text-yellow-300 cursor-pointer">
              Log in
            </span>
            <span>|</span>
            <span onClick={() => navigate("/RegisterUser")} className="hover:text-yellow-300 cursor-pointer">
              Sign up
            </span>
          </div>
        ) : (
          <div>
            <span onClick={e=>{setShowProfile(true)}} className="hover:text-yellow-300 cursor-pointer">
              <img src={avatar} alt="" className="h-[35px] w-[35px] rounded-full"/>
            </span>
            
          </div>
        )}
      </div>
    </nav>
    {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Navbar;
