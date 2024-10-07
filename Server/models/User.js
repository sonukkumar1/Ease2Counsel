import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    applicationId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ['helper', 'admin'],
        default: 'admin',
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;