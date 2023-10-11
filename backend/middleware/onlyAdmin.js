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
        console.log("decoded :",decoded); //todo do soomething with decoded ? 
        const admin = await User.findOne({ signedHash : decoded.signature}).exec();
        const test = await User.findOne({address : "0xB810b728E44df56eAf4Da93DDd08168B3660753f"}).exec();
        console.log ("admin : ",admin?.signedHash)
        console.log ("test : ",test?.signedHash)
        // console.log ("test : ",test)
        if (!admin) return res.status(403).send({message : "FORBIDEN not an admin"})
        // next();
        console.log("USER ERASED")
        return res.status(200)

    } catch (err) {
        console.log (err)
            return res.status(500).send({message : "Server Error in decoding jwt"}) ;
    }
}

module.exports =  onlyAdmin;