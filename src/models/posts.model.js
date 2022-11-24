import mongoose from 'mongoose'

/**
 * @constructor
 * Схема документа Todo
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {text: {require: boolean, type: StringConstructor}, user: {ref: string, require: boolean, type: ObjectId}}>}
 */
const ToDoSchema = new mongoose.Schema(
    {
        text: {
            require: true,
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model('Todo', ToDoSchema)
