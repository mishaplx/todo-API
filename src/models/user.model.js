import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        email: {
            require: true,
            type: String,
            unique: true,
        },
        passwordHash: {
            require: true,
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model('User', UserSchema)
