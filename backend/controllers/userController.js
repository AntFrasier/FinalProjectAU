const User = require("../model/User");


// @desc post new user 
// @route Post /user
async function addNewUser(req, res) {
    const { user } = req.body;
    if (!user) return res.status(400).send({message : "user Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : user.address}).exec();
    if (existUser) {
         res.status(409).send({message: "user already exist", data : existUser});
         return;
    }
    try {
        const result = await User.create ({
            "name": user.name,
            "address" : user.address,
            "roles" : user.role,
            "webSite" : user.website,
            "signedHash": user.signature,
        })
        console.log(result);
        res.status(201).send({message : `New user ${user.address} created.`, data : result});
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

// @desc Get a specific User 
// @route Post /user/:id
async function getUser(req, res) { 
    const { id } = req.params; //id stand for address in the params
    console.log(id)
    try {
        const existUser = await User.findOne({address : id}).exec();
        if (existUser) {
         res.status(200).send({message: "user exist", data : existUser});
         return;
        } else res.status(204).send({message: "no user found"})
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

// @desc Get all users whith partners role 
// @route Post /user/partners
async function getPartners(req, res) { 
    try {
        const partners = await User.find({role : 2002}).exec();
        console.log(partners)
        res.status(200).send(partners)
       
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

// @desc Get all users whith members role 
// @route Post /user/members
async function getMembers(req, res) { 
        try {
        const members = await User.find({role : 1001}).exec();
        console.log(members)
        res.status(200).send(members)
       
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

async function deleteUser(req, res) {
    const { id } = req.params; //id stand for address in the params
    console.log(id)
    try {
        const userDeleted = await User.findOneAndDelete({address : id}).exec();
        if (existUser) {
        console.log(userDeleted)
         res.status(200).send({message: "user deleted !", data : userDeleted});
         return;
        } else res.status(204).send({message: "no user found"})
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }
}

module.exports = { addNewUser, getUser, getPartners, getMembers, deleteUser };