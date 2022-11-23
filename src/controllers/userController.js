import { validationResult } from 'express-validator'
import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
require('dotenv').config()

import userModel from '../models/user.model.js'
export const registrate = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array())
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(+process.env['SALT'])

        const passHash = await bcrypt.hash(password, salt)
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: passHash,
        })
        const user = await doc.save()
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_TIME,
            }
        )
        const { passwordHash, ...userData } = user

        return res.json({ userData, token })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не Удалось зарегестрироваться',
        })
    }
}
export const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array())
        }
        const user = await userModel.findOne({
            email: req.body.email,
        })

        if (!user) {
            res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const isValidate = await bcrypt.compare(
            req.body.password,
            user.passwordHash
        )
        if (!isValidate) {
            res.status(403).json({
                message: 'Неверный логин или пороль',
            })
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_TIME,
            }
        )

        const { passwordHash, ...userData } = user

        return res.json({ userData, token })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Ошибка входа',
        })
    }
}
export const check = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        res.status(200).json({
            message: 'OK',
            user: user,
        })
    } catch (e) {
        console.log(e)
    }
}
