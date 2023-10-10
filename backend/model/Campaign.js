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
    description: {
        type: String,
    },
    payementAddress: {
        type: String,
        required: true,
    },
    nFTContractAddress: {
        type: String,
        required: true,
    },
    vendorContractAddress: {
        type: String,
        required: true,
    },
    required: {
        type: Number,
        required: true,
    },
    validity: {
        type: Number,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    //@todo it will be better if the discount, the required date is stored here!
});

module.exports = mongoose.model('Campaign', campaignSchema);