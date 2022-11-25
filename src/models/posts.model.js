import mongoose from 'mongoose'

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
