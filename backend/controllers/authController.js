const User = require("../model/User");
const { verifyMySignature } = require("../utils/verifyMySignature");
const jwt = require('jsonwebtoken');


// @desc Get a specific User nonce
// @route Get /login/nonce/:id
async function getNonce(req, res) {
    const { id } = req.params; //id stand for address in the params
    console.log("try to reach the nonce" , id)
    try {
        const existUser = await User.findOne({address : id}).exec();
        console.log("do i find the user here ?", existUser)
        if (existUser) {
            return res.status(200).send({message: "user exist", data : existUser.nonce});
         
        } else return res.status(204).send({message: "no user found"})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

// @desc a user try to loggin 
// @route post /login/
const login = async (req, res) => {
    const {address, signature} = req.body;
    console.log(req.body)
    console.log("trying to login wihth :" , address , signature)
    try {
        if (!address&&!signature ) return res.status(400).send({message : "address and signature Required"});
        //chek if user allready exist
        const existUser = await User.findOne({address : address}).exec();
        if (!existUser) return res.status(204).send({message : "user not found Please register first !"})
        const  authorized = await verifyMySignature(address, signature, existUser.nonce);
        if (authorized) {
            console.log(address, " autorized");
            const accessToken = jwt.sign(
                {"signature" : signature},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "10s"}
            );
            const refreshToken = jwt.sign(
                {"signature" : signature},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "5d"}
            );
            existUser.refreshToken = refreshToken;    
            existUser.signedHash = signature;    
            existUser.nonce++;
            await existUser.save();
            console.log("the existing user : ",existUser)
            const toSendBack = { //just send what we need in the front
                id:existUser.id,
                address:existUser.address,
                name:existUser.name,
                nonce:existUser.nonce,
                role:existUser.role,
                website:existUser.webSite,
                accessToken: existUser.accessToken,
                
            }
    
            //res.cookie("jwt", refreshToken,{httpOnly: false, maxAge: 24 * 60 *60 * 1000});  //send the refresh token as an http only cookie so it can not be accessible from JS for security concern not perfect but quite secure
            //res.send();
            res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 *60 * 1000}); 
            res.status(200);
            res.send({message: "Autorized", data : toSendBack, accessToken: accessToken}); 
        } else {
            console.log(authorized, address, "not authorized");
            res.status(403).send({message: "Not Autorized Signature doesnt match !"})
        }
    } catch (err) {
        res.satus(500).send({message : "Erreur serveur"})
    }
    
}


const refresh = async (req, res) => {
    const cookie = req.cookies;
    if(!cookie?.jwt) return res.status(401).send({message : "no refreshToken sent"});
    console.log("cookie . jwt :", cookie.jwt)
    const refreshToken = cookie.jwt;
    const existUser = await User.findOne({refreshToken : refreshToken}).exec();
    if (!existUser) return res.status(401).send({message : "user not found with the refreshToken Please Loggin again ! !"})
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log("decoded : ", decoded)
            if (err || decoded.signature !== existUser.signedHash) return res.status(403).send({message : "decoded signature doesnt match ! UnAuthorized"})
            const accessToken = jwt.sign(
                {"signature" : existUser.signedHash},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "30s"}
            );
            res.status(200).send({accessToken});
        }
    )
}

const logout = async (req, res) => {
    const { id } = req.params;
    const existUser = await User.findOne({address: id}).exec()
    if (!existUser) return res.status(404).send({message: "User not found!"})
    existUser.refreshToken = "";
    await existUser.save();
    return res.status(200).send({message : " refreshToken has been removed"});
}

module.exports = { login, refresh, getNonce, logout };