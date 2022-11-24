import ToDoSchema from '../models/posts.model.js'
import { validationResult } from 'express-validator'
export const Todo = {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createToDoItem: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json(errors.array())
            }
            const todo = new ToDoSchema({
                text: req.body.text,
                user: req.userId,
            })
            const result = await todo.save()
            res.json(result)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'не удалось создать запись',
            })
        }
    },
    getToDoById: async (req, res) => {
        try {
            const id = req.params.id

            const todoItem = await ToDoSchema.findById(id)
            res.json(todoItem)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'не удалось найти запись',
            })
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getAlToDoList: async (req, res) => {
        try {
            const toDoList = await ToDoSchema.find().populate('user').exec()
            res.json(toDoList)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'ошибка сервера',
            })
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    deleteToDoItem: (req, res) => {
        try {
            const toDoItemId = req.params.id
            ToDoSchema.findByIdAndDelete(
                { _id: toDoItemId },
                {},
                (err, doc) => {
                    if (err) {
                        console.log(err)
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
                }
            )
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'не удалось удалить запись',
            })
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    updateToDoItem: async (req, res) => {
        try {
            const toDoItemId = req.params.id
            const newText = req.body.text
            console.log(newText)
            console.log(toDoItemId)
            await ToDoSchema.updateOne(
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
    },
}
