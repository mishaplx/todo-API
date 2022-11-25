import express from 'express'
import cors from 'cors'
import * as mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
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
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log(__dirname)
/**
 * @file index.js is the root file for this example app
 * @author Plehnevich Misha
 * @see <a href="https://github.com/mishaplx/todo-API">Plehnevich Misha</a>
 *
 */

/** Express router providing user related routes
 * @module todo
 * @requires express
 */

/**
 * express module
 * @const
 */
const app = express()

mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => {
        console.log('DB Ok')
    })
    .catch(err => console.log('DB connection ERROR---', err))
app.use('/', express.static(__dirname + '/public'))
app.use('/docs', express.static(__dirname + '/docs'))
app.use(express.json())
app.use(cors())

/**
 * Route serving login.
 * @name /auth/register
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} registrate - function.
 */
app.post('/auth/register', registerValidator, UserController.registrate)
/**
 * Route serving login.
 * @name /auth/login
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} login - function.
 */
app.post('/auth/login', loginValidator, UserController.login)
/**
 * Route serving in check.
 * @name /auth/me
 * @function
 * @memberof module:check
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} registrate - function.
 */
app.get('/auth/me', checkAuth, UserController.check)
/**
 * Route serving create todo.
 * @name /post/
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} createToDoItem - function.
 */
app.post('/post/', checkAuth, todoValidator, Todo.createToDoItem) // создание записи
/**
 * Route serving get all todo.
 * @name /posts/
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} getAlToDoList - function.
 */
app.get('/posts/', checkAuth, Todo.getAlToDoList) // получить все записи
/**
 * Route serving get all todo with pagination.
 * @name /posts/page/:page/count/:count/
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} getAlToDoListWithPagination - function.
 */
app.get('/posts/page/:page/count/:count', checkAuth, Todo.getAlToDoListWithPagination) // получить записи с пагинацией
/**
 * Route serving get todo item by id
 * @name /post/:id
 * @function
 * @memberof module:getToDoById
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} registrate - function.
 */
app.get('/post/:id', checkAuth, Todo.getToDoById) // получить по id
/**
 * Route serving delete todo.
 * @name /post/:id
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} deleteToDoItem - function.
 */
app.delete('/post/:id', checkAuth, Todo.deleteToDoItem) // удаление записи
/**
 * Route serving upate todo item.
 * @name /post/:id
 * @function
 * @memberof module:todo
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} updateToDoItem - function.
 */
app.put('/post/:id', checkAuth, Todo.updateToDoItem)

const PORT = process.env.PORT
app.listen(+PORT, () => {
    console.log(`Server Ok,listen localhost:${PORT}`)
})
