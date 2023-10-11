require ("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const onlyAdmin = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return (res.status(401).send({message : "no auth header found !"}));
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        )
        const admin = await User.findOne({ signedHash : decoded.signature}).exec();
        if (admin?.role === 3003) next();
        else {
            console.log("USER ERASED")
            return res.status(403).send({message : "FORBIDEN not an admin"})

        }
        
       

    } catch (err) {
        console.log (err)
            return res.status(500).send({message : "Server Error in decoding jwt"}) ;
    }
}

module.exports =  onlyAdmin;