const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema ( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    PayementAddress: {
        type: String,
        required: true,
    },
    NFTContractAddress: {
        type: String,
        required: true,
    },
    contractAddress: {
        type: String,
        required: true,
    },
    //@todo it will be better if the discount, the required date is stored here!
});

module.exports = mongoose.model('Campaign', campaignSchema);