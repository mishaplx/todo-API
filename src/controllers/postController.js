import ToDoSchema from '../models/posts.model.js'
import { validationResult } from 'express-validator'

export const createToDoItem = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array())
        }
        const todo = new ToDoSchema({
            text: req.body.text,
        })
        const result = await todo.save()
        res.json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'не удалось создать запись',
        })
    }
}
export const getToDoById = async (req, res) => {
    try {
        const todoItem = await ToDoSchema.findById(res.param.id)
        res.json(todoItem)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'не удалось найти запись',
        })
    }
}

export const getAlToDoList = async (req, res) => {
    try {
        const toDoList = await ToDoSchema.find().populate('User').exec()
        res.json(toDoList)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'ошибка сервера',
        })
    }
}
export const deleteToDoItem = async (req, res) => {
    try {
        //const toDoItem = await ToDoSchema.deleteOne()
        const toDoItemId = req.param.id
        await ToDoSchema.findByIdAndDelete({ toDoItemId }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: 'не удалось удалить запись',
                })
            }
            if (!doc) {
                res.status(500).json({
                    message: 'не удалось найти запись',
                })
            }
            res.json({
                success: true,
                message: 'запись удалена',
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'не удалось удалить запись',
        })
    }
}
export const updateToDoItem = async (req, res) => {
    try {
        const toDoItemId = req.param.id
        const newText = req.body.text
        const toDoItem = await ToDoSchema.updateOne(
            {
                _id: toDoItemId,
            },
            { text: newText }
        )
        res.json({
            success: true,
            message: 'запись обновлена',
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'не удалось обновить запись',
        })
    }
}
