import express from 'express'
const cors = require('cors')
import * as mongoose from 'mongoose'
import { login, check, registrate } from './controllers/userController.js'
import checkAuth from './utils/checkAuth.js'
import {
    loginValidator,
    registerValidator,
    todoValidator,
} from './validations/validator.js'
import {
    createToDoItem,
    deleteToDoItem,
    getAlToDoList,
    getToDoById,
    updateToDoItem,
} from './controllers/postController.js'
require('dotenv').config()

const app = express()

mongoose
    .connect('mongodb://root:example@localhost:27017')
    .then(() => {
        console.log('DB Ok')
    })
    .catch(err => console.log('DB connection ERROR---', err))

app.use(express.json())
app.use(cors())

app.post('/auth/register', registerValidator, registrate)

app.post('/auth/login', loginValidator, login)

app.get('/auth/me', checkAuth, check)

app.post('/post/', checkAuth, todoValidator, createToDoItem) // создание записи
app.get('/post/', checkAuth, getAlToDoList) // олу
app.get('/post/:id', checkAuth, getToDoById) // получить по id
app.delete('/post/:id', checkAuth, deleteToDoItem) // удаление записи
app.put('/post/:id', checkAuth, updateToDoItem)

const PORT = process.env.PORT
app.listen(+PORT, () => {
    console.log('Server Ok,listen localhost:4444')
})
