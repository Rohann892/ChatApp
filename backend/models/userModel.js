import mongoose from "mongoose";

const uesrModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', uesrModel);

export default User;