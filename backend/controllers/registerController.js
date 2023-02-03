const User = require("../model/User");

async function addNewUser(req, res) {
    const { user } = req.body;
    if (!user) return res.status(400).send({message : "user Required"});
    //chek if user allready exist
    const existUser = await User.findOne({address : user.address}).exec();
    if (existUser) return res.status(409).send({message: "user already exist"});
    try {
        const result = await User.create ({
            "address" : user.address,
        })
        console.log(result);
        res.status(201).send({message : `New user ${user.address} created.`})
    } catch (err) {
        console.error(err);
        res.status(500).send({message : `serveur erreur : ${err}`});
    }

}
module.exports = { addNewUser };