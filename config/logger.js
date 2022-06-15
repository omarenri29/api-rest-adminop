import { createLogger, transports, format } from "winston";
import 'winston-mongodb';
import dotenv from "dotenv";

dotenv.config();
const {MONGO_URI} = process.env;

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
}) 
 
export {logger};