import {Router} from 'express'
import upload from '../middleware/multer.middleware.js'
import {
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
} from '../controller/user.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'

const router = Router()

router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/refreshAccessToken').get(refreshAccessToken)



router.route('/logout').post(verifyJWT,logoutUser)
router.route('/changeCurrentPassword').post(verifyJWT,changeCurrentPassword)
router.route('/getUser').get(verifyJWT,getUser)
router.route('/updateUserAvatar').patch(verifyJWT,upload.single('avatar'),updateUserAvatar)
router.route('/updateAccountDetailsTextBased').patch(verifyJWT,updateAccountDetailsTextBased)
router.route('/acceptAllergiesAndMedicalCondition').patch(verifyJWT,acceptAllergiesAndMedicalCondition);
router.route('/acceptPromptAndGenerateRecipies').post(verifyJWT,acceptPromptAndGenerateRecipies)
router.route('/getClosestHospitals').post(getClosestHospitals)  

export default router