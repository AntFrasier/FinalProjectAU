require ("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return (res.status(401).send({message : "no auth header found !"}));
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send({message : "UnAuthorized, access token not correct"}) ;
            //console.log(decoded); //todo do soomething with decoded ? 
            next();
        }
    )

}

module.exports =  verifyJWT;