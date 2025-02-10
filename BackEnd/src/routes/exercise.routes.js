import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {createNewExercise,fetchAllExercise,fetchExerciseByTrimester,removeExerciseFromStore} from '../controller/exercise.controller.js'
const router = Router()

router.route('/createNewExercise').post(upload.single('exercise'),createNewExercise)
router.route('/fetchAllExercise').get(fetchAllExercise)
router.route('/fetchExerciseByTrimester').post(fetchExerciseByTrimester)
router.route('/removeExerciseFromStore').delete(removeExerciseFromStore)


export default router
