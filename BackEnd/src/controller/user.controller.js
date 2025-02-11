import {User} from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import {ApiError} from '../utils/ApiError.util.js'
import {uploadOnCloudinary as cloudinary,deleteFromCloudinary} from '../utils/clodinary.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import jwt from 'jsonwebtoken'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios'


const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,'something went wrong while generating refresh and access token ')
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {email,username,age,weight,height,password,allergies} = req.body

    if(!email || !username || !age || !weight || !height || !password) {throw new ApiError(400,"All field are required")}

    const prevUser = await User.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(prevUser){throw new ApiError(400,'User already exist please user new credential')}
    const avatarLocPath = req.file?.path

    if(!avatarLocPath) { throw new ApiError(400,'Avatar is required')}

    const avatar = await cloudinary(avatarLocPath)

    if(!avatar){throw new ApiError(400,'something went wrong while uploading on cloudinary')}

    const newUser = await User.create({
        email,
        username:username.toLowerCase(),
        password,
        age,
        weight,
        height,
        avatar:avatar.url,
        allergies:allergies||[]
    })

    if(!newUser){throw new ApiError(500,'Error in creation of new user')}
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(newUser._id)
    const user = await User.findById(newUser._id).select("-password -refreshToken")
    const option = {
        secure:true
    }
    if(!user){throw new ApiError(500,'Something went wrong')}
    return res .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(
            200,
            {
               accessToken,
               refreshToken,
            },
            "User logged In successfully"
        )
    )
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {throw new ApiError(400,'Email and password is required')}

    const user = await User.findOne({email});

    if(!user){throw new ApiError(400,'User with this email do not exist')}

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){throw new ApiError(400,'User password is wrong')}

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedUser = await User.findById(user._id).select('-password -refreshToken')

    const option = {
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,  )
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedUser,accessToken,refreshToken
            },
            "User logged In successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const option = {
        secure:true
    }
    return res.status(200).clearCookie("accessToken",option).clearCookie("refreshToken",option)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){ throw new ApiError(400,"unauthorized request")}

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){throw new ApiError('401','user not found')}
    
        if(incomingRefreshToken === user?.refreshToken){
            const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)
            const option = {
                secure:true
            }
            return res
            .status(200)
            .cookie("accessToken",accessToken,option)
            .cookie("refreshToken",newRefreshToken,option)
            .json(
                new ApiResponse(200,{
                    accessToken,
                    refreshToken : newRefreshToken
                },"Access token refreshed successfully")
            )
        }else{
            throw new ApiError(401,'You are unauthorized as refresh token dont match')
        }
    } catch (error) {
        throw new ApiError(500,error?.message||'Something went wrong while refreshing token')
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(isPasswordCorrect){
        user.password = newPassword
        await user.save({validateBeforeSave : false})
        return res
        .status(200)
        .json(new ApiResponse(200,{},"Password Changed Successfully"))
    }else{
        throw new ApiError(400,"Invalid password!!")
    }
})

const getUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"User fetched successfully"))
})

const updateAccountDetailsTextBased =  asyncHandler(async(req,res)=>{
    const {weight,age,height} = req.body
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { 
            $set:{
                weight,
                age,
                height
            }
        },
        {new :true}
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req,res)=>{
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        new ApiError(400,"Avatar is required while updation")
    }
    const avatar = await cloudinary(avatarLocalPath)
    if(!avatar.url){
        new ApiError(400,"Error while uploading on cloudinary during updating Avatar")
    }
    
    await deleteFromCloudinary(avatarLocalPath)
    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                avatar : avatar.url 
            },
        },{new:true}
    ).select('-password')
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Avatar updated successfully"))
})

const acceptAllergiesAndMedicalCondition = asyncHandler(async (req, res) => {
    const { allergies } = req.body;

    if (!allergies || typeof allergies !== 'string') {
        throw new ApiError(400, "Invalid input. allergies must be a non-empty string.");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { allergies: allergies } }, // Directly add the string
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedUser, 'Allergy added'));
});


const acceptPromptAndGenerateRecipies = asyncHandler(async(req,res)=>{
    let prompt = 'I want curated and healthy diet plan';
    const {trimester} = req.body;

    if(!req.user){throw new ApiError(400,'User must be logged In')}
    const allergies = req.user.allergies;

    if(allergies.length>0)
    {
        prompt+=" take care that i have follow allergies while suggesting me recipe "
        prompt+=allergies.join(" ")
    }
    if(trimester){
        prompt+=`I am in ${trimester} trimester of pregnancy`
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent(prompt);
        const response =  result.response.text()
        console.log(response)
        return res.status(200).json(new ApiResponse(200,response,"Propmt generated"))
    } catch (error) {
        throw new ApiError(500,error.message||"Something went worong")   
    }
})

const getClosestHospitals = asyncHandler(async(req,res)=>{

    try {
    
        const {address} = req.body;
        if(!address){throw new ApiError(400,"Address is required")}

        const apiUrl = `https://maps.gomaps.pro/maps/api/geocode/json?key=${process.env.GO_MAP_API_KEY}&address=${encodeURIComponent(address)}`;
        const result = await axios.get(apiUrl);
        console.log(result.data.status)
        if (result.data.status !== "OK") {
            throw new ApiError(400,'Something went wrong while fetching user location');
        }
        const location = result.data.results[0]?.geometry?.location;
        console.log(location)
        const lat = location.lat
        const lng = location.lng
        let rad = 3000;
        let Url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&name=maternalhospital&key=${process.env.GO_MAP_API_KEY}&radius=${rad}`
        let response = await axios.get(Url)
        let cnt = 0;
        console.log(response.data.results)   
        while((response.data.results.length===0) && cnt<5){
            cnt+=1;
            rad+=1500;
            Url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&name=maternalhospital&key=${process.env.GO_MAP_API_KEY}&radius=${rad}`
            response = await axios.get(Url)
        }
        if(!response){throw new ApiError(500,'Something went wrong while fetching hospitals')}
        const hospitals = response.data.results.map(hospital => ({
            name: hospital.name || "Unknown",
            rating: hospital.rating || "No rating",
            latitude: hospital.geometry.location.lat,
            longitude: hospital.geometry.location.lng,
            address:hospital.vicinity||"No address"
        }));
        return res.status(200).json(new ApiResponse(200,hospitals,'Hospitals fetched successfully'))
    } catch (error) {
        throw new ApiError(500,error.message||"Something went wrong")
    }
})
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getUser,
    updateUserAvatar,
    updateAccountDetailsTextBased,
    acceptAllergiesAndMedicalCondition,
    acceptPromptAndGenerateRecipies,
    getClosestHospitals
};
