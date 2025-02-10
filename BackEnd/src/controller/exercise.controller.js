import {Exercise} from '../models/exercise.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import {ApiError} from '../utils/ApiError.util.js'
import {ApiResponse} from '../utils/ApiResponse.util.js'
import { uploadOnCloudinary as cloudinary } from '../utils/clodinary.util.js'



const createNewExercise = asyncHandler(async(req,res)=>{
    const {name,description,trimester,repetition,sets} = req.body;

    if(!name || !description || !trimester || !repetition || !sets){
        throw new ApiError(400,'All fields are required')
    }

    const exerciseLocPath = req.file?.path

    if(!exerciseLocPath){throw new ApiError(400,'File is required')}

    const exercise = await cloudinary(exerciseLocPath)

    if(!exercise){throw new ApiError(500,'Error while uploading on cloudinary')}

    const newExercise = await Exercise.create({
        name,
        description,
        trimester,
        repetition,
        sets,
        url:exercise.url
    })

    return res.status(200).json(new ApiResponse(200,newExercise,'New exercise created'))
})

const fetchAllExercise = asyncHandler(async(req,res)=>{
     const exercises = await Exercise.find()
     if(!exercises){throw new ApiError(400,'There are no exercise in store')}
     return res.status(200).json(new ApiResponse(200,exercises,"All exercise are fetched"))
})

const fetchExerciseByTrimester = asyncHandler(async(req,res)=>{
    const {trimester} = req.body

    if(!trimester){throw new ApiError(400,'trimester is required to find exercise')}

    const exercise = await Exercise.find({trimester})

    if(!exercise){throw new ApiError(400,'Exerice with that name do not exist')}

    return res.status(200).json(new ApiResponse(200,exercise,"Your Exercise"))
})

const removeExerciseFromStore = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name){throw new ApiError(400,'Name is required to remove Exercise')}

    await Exercise.deleteOne({name})

    return res.status(200).json(new ApiResponse(200,{},'Exercise succcessfully removed'))
})


export {createNewExercise,fetchAllExercise,fetchExerciseByTrimester,removeExerciseFromStore}
