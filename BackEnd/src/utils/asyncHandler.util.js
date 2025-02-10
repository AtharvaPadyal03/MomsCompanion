const asyncHandler = (fucn)=>{
    return (req,res,next)=>{
        Promise.resolve(fucn(req,res,next)).catch((err)=>next(err))
    }
}

export default asyncHandler