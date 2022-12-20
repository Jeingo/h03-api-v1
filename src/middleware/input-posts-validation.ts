import {body} from "express-validator"
import {blogsCollection} from "../repositories/db"


const checkId = async (id: string) => {
    const foundBlog = await blogsCollection.findOne({id: id})
    if(foundBlog) {
        return true
    } else {
        throw new Error('ID not found')
    }
}

export const titleValidation = body('title').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 30}).withMessage('Should be less than 30 symbols').bail()

export const shortDescriptionValidation = body('shortDescription').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 100}).withMessage('Should be less than 100 symbols').bail()

export const contentValidation = body('content').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 1000}).withMessage('Should be less than 1000 symbols').bail()

export const blogIdValidation = body('blogId').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .custom(checkId).withMessage('Should be existing id').bail()