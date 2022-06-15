import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { server, app } from "../index.js";


const mongo = await MongoMemoryServer.create();

//connecto to db
const connect = async () => {
    const uri = await mongo.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await mongoose.createConnection(uri, mongooseOpts);
}

//Disconnect and close connection
const closeDataBase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
    await mongo.stop();
}

const clearDataBase = async () => {
    const collections = mongoose.connection.collections;    
    for(const key in collections){
        const collection = collections[key];        
        await collection.deleteMany();
    }
}

export {connect, closeDataBase, clearDataBase};