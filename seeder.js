import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; 
import User from "./models/User.js";
import {data} from "./assets/data.js";

dotenv.config();
const {MONGO_URI} = process.env;

mongoose.connect(MONGO_URI);
try {
    let user = new User(data);
    const salt = await bcrypt.genSalt(10);    
    user.password = await bcrypt.hash(user.password, salt);
    user.save(()=>{
        exit();
    });
} catch (error) {
    console.log(error.message);
}

const exit = () =>{
    mongoose.disconnect();
}

