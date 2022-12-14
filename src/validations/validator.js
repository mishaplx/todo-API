import { body } from 'express-validator'

export const registerValidator = [
    body('email', 'почта не соответсвует формату').isEmail(),
    body('password', 'пороль должен содержать больше 5 символов').isLength({
        min: 5,
    }),
]
export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]
export const todoValidator = [body('text').isString().isLength({ max: 500 })]
