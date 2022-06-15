import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        immutable: true
    },
    role: {
        type: String,
        default: 'user',
        require: true,
        enum: ['user', 'admin', 'superadmin']
    },
    english_level: {
        type: Number,
        require: true,
    },
    technical_knowledge: {
        type: String,
        require: true,
    },
    cv_url: {
        type: String,
        require: true,
    },
},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
