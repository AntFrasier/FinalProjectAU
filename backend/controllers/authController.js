const User = require("../model/User");
const { verifyMySignature } = require("../utils/verifyMySignature");
//require('dotenv').config();
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {address, signature} = req.body;
    console.log(req.body)
    console.log("trying to login wihth :" , address , signature)
    if (!address&&!signature ) return res.status(400).send({message : "address and signature Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : address}).exec();
    if (!existUser) return res.status(401).send({message : "user not found Please register first !"})
    const  authorized = await verifyMySignature(address, signature, existUser.nonce);
    if (authorized) {
        console.log(address, " autorized");
        const accessToken = jwt.sign(
            {"signature" : signature},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30s"}
        );
        const refreshToken = jwt.sign(
            {"signature" : signature},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "5d"}
        );
        existUser.refreshToken = refreshToken;    
        existUser.nonce++;
        await existUser.save();
        const toSendBack = { //just send what we need in the front
            id:existUser.id,
            address:existUser.address,
            name:existUser.name,
            nonce:existUser.nonce,
            role:existUser.role,
            website:existUser.webSite,
        }

        
        res.cookie("jwt", refreshToken,{httpOnly: false, maxAge: 24 * 60 *60 * 1000});  //send the refresh token as an http only cookie so it can not be accessible from JS for security concern not perfect but quite secure
        res.status(200).send({message: "Autorized", data : toSendBack, accessToken: accessToken}); 
        // res.;
        //todo increment nonce
    } else {
        console.log(authorized, address, "not authorized");
        res.status(403).send({message: "Not Autorized Signature doesnt match !"})
    }
}

module.exports = {login};