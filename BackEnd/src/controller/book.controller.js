import {Book} from '../models/books.model.js'
import { ApiError } from '../utils/ApiError.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import { uploadOnCloudinary as cloudinary} from '../utils/clodinary.util.js'


const uploadBook = asyncHandler(async(req,res)=>{
    const {name,author} = req.body
    if(!name || !author){throw new ApiError(400,'Credentials are required')}

    const prevBook = await Book.findOne({
        name:name
    })
    
    if(prevBook) {throw new ApiError(400,'Book with same name exist')}

    const bookLocPath = req.files?.book[0]?.path
    let coverImageLocPath;
    if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0){
        coverImageLocPath = req.files.coverimage[0].path
    }
    
    if(!bookLocPath){throw new ApiError(400,'Book is required')}
    if(!coverImageLocPath){throw new ApiError(400,'Cover Image is required')}

    const book = await cloudinary(bookLocPath)
    const coverImage = await cloudinary(coverImageLocPath)

    if(!book){throw new ApiError(500,'Failed to upload on cloudinary')}
    if(!coverImage){throw new ApiError(500,'Failed to upload cover image on cloudinary')}

    const newBook = await Book.create({
        name,
        author,
        url:book.url,
        coverimage:coverImage.url
    })
    return res.status(200).json(new ApiResponse(200,newBook,'Book success stored'))
})

const fetchAllBooks = asyncHandler(async(req,res)=>{
    const books = await Book.find()
    if(!books){throw new ApiError(400,'There are no books in store')}

    return res.status(200).json(new ApiResponse(200,books,"All books are fetched"))
})

const fetchBookByName = asyncHandler(async(req,res)=>{
    const  {name} = req.body;
    if(!name){throw new ApiError(400,'Name is required to find book')}

    const book = await Book.findOne({name})
    if(!book){throw new ApiError(400,'Book with that name do not exist')}

    return res.status(200).json(new ApiResponse(200,book,"Your Book"))
})

const removeBookFromStore = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name){throw new ApiError(400,'Name is required to remove book')}

    await Book.deleteOne({name})

    return res.status(200).json(new ApiResponse(200,{},'Book succcessfully removed'))
})

export {uploadBook,fetchAllBooks,fetchBookByName,removeBookFromStore}