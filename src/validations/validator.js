import { body } from 'express-validator'

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]
export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]
export const todoValidator = [body('text').isString().isLength({ max: 500 })]
