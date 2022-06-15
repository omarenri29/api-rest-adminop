import { logger } from "../config/logger.js";

const logReqRes = (req, res, next) => {    
    logger.info(req.body)    ;
    let response = res.send;
    res.send = function(data){        
        logger.info(data);
        response.apply(res, arguments)
    }
    next();
}


export default logReqRes; 