require ("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorizations"];
    if (!authHeader) return (res.status(401).send({message : "no auth header found !"}));
    console.log("authHeader : ", authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send({message : "UnAuthorized, access token niot correct"}) ;
            console.log(decoded); //todo do soomething with decoded ? 
            next();
        }
    )

}

module.exports =  verifyJWT;