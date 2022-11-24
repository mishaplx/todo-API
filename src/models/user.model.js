import mongoose from 'mongoose'

/**
 * @constructor
 * Схема документа user
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {email: {unique: boolean, require: boolean, type: StringConstructor}, passwordHash: {require: boolean, type: StringConstructor}}>}
 */
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
