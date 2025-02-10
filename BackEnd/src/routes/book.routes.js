import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {uploadBook,fetchAllBooks,fetchBookByName,removeBookFromStore} from '../controller/book.controller.js'

const router = Router()


router.route('/fetchBooks').get(fetchAllBooks)
router.route('/fetchBookByName').get(fetchBookByName)
router.route('/removeBookFromStore').delete(removeBookFromStore)


router.route("/uploadBooks").post(
    upload.fields([
        {
            name: 'book',
            maxCount: 1
        }, {
            name: 'coverimage',
            maxCount: 1,
        }
    ])
    , uploadBook)

export default router