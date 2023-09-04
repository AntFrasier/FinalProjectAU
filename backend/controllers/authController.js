const User = require("../model/User");
const { verifyMySignature } = require("../utils/verifyMySignature");


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
        existUser.nonce++;
        await existUser.save();
        return res.status(200).send({message: "Autorized", data : existUser});
        //todo increment nonce
    } else {
        console.log(authorized, address, "not authorized");
        return res.status(403).send({message: "Not Autorized Signature doesnt match !"})
    }
}

module.exports = {login};