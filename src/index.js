import express from 'express'
import cors from 'cors'
import * as mongoose from 'mongoose'

import checkAuth from './utils/checkAuth.js'
import {
    loginValidator,
    registerValidator,
    todoValidator,
} from './validations/validator.js'
import { Todo } from './controllers/toDoController.js'
import dotenv from 'dotenv'
import { UserController } from './controllers/userController.js'

dotenv.config()
/**
 * @file index.js is the root file for this example app
 * @author Brad Traversy
 * @see <a href="https://github.com/mishaplx/todo-API">Plehnevich Misha</a>
 */
const app = express()

mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => {
        console.log('DB Ok')
    })
    .catch(err => console.log('DB connection ERROR---', err))

app.use(express.json())
app.use(cors())

app.post('/auth/register', registerValidator, UserController.registrate)
app.post('/auth/login', loginValidator, UserController.login)
app.get('/auth/me', checkAuth, UserController.check)

app.post('/post/', checkAuth, todoValidator, Todo.createToDoItem) // создание записи
app.get('/posts/', checkAuth, Todo.getAlToDoList) // получить все записи
app.get('/post/:id', checkAuth, Todo.getToDoById) // получить по id
app.delete('/post/:id', checkAuth, Todo.deleteToDoItem) // удаление записи
app.put('/post/:id', checkAuth, Todo.updateToDoItem)

const PORT = process.env.PORT
app.listen(+PORT, () => {
    console.log(`Server Ok,listen localhost:${PORT}`)
})
