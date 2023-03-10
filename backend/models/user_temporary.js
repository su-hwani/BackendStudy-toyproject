import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    phone: String,
    department: String,
    studentID: String,
    _ID: String,
    _PW: String,
    createdAt:{
        type:Date,
        expires:24 * 3600 * 1000 * 7,
        default:Date.now
    }
})

export const User_temporary = mongoose.model("user_temporary", userSchema)