import { ApiError } from "../utils/ApiError.util.js"
import asyncHandler from "../utils/asyncHandler.util.js"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer','')
    
        if(!token){
            throw new ApiError(401,'Unauthorized Request')
        }
    
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    
        if(!user){throw new ApiError(401,"Invaild access Token")}
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message||'Invalied Token')
    }
}) 