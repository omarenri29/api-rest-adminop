import { createLogger, transports, format } from "winston";
import 'winston-mongodb';
import dotenv from "dotenv";

dotenv.config();
const {MONGO_URI} = process.env;

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const logger = createLogger({
    transports: [ 
        new transports.File({
            filename: `./logs/adminop_${date}.log`,
            level: 'info', 
            format: format.combine(format.timestamp(), format.json())
        })
    ]
}) 
 
export {logger};