
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    phone: String,
    department: String,
    studentID: String,
    _ID: String,
    _PW: String,
})

export const User_permanent = mongoose.model("user_permanent", userSchema)