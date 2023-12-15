const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtSecretKey = process.env.SECRET_KEY || 'default-secret-key';

const authenticateUser = (req,res,next) => {
    const token = req.headers.authorization || req.cookies.token;

    if(!token){
        return res.status(401).json({message : 'Authentication required'});
    }

    try{
        const decoded = jwt.verify(token , jwtSecretKey);
        req.user  = decoded;
        next();
    }catch(error){
        console.error(error);
        return res.status(401).json({message : "Authentication failed"});
    }
};


module.exports = authenticateUser;