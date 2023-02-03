const User = require("../model/User");
const Campagne = require("../model/User");


//todo add protection to conncted users


// @desc Create a campagne
// @route Post /campagne
async function createCampagne(req, res) {
    const { user, campagne } = req.body;
    if (!user) return res.status(400).send({message : "user Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : user.address}).exec();
    if (!existUser) return res.status(403).send({message: "Must be registred"});
    try {
        const result = await Campagne.create ({
            "user" : existUser,
            "name": campagne.name,
        })
        console.log(result);
        res.status(201).send({message : `New campagne ${campagne.name} created.`})
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }

}
// @desc Delete a campagne
// @route Delete /campagne:id
async function deleteCampagne(req, res) {

}
// @desc modify a campagne
// @route Patch /campagne:id
async function patchCampagne(req, res) {

}

// @desc get all a user's campagne
// @route Post /campagne
async function createCampagne(req, res) {
   
}

module.exports = { createCampagne };