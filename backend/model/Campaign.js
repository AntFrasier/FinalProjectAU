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
    // contractAddress: {
    //     type: String,
    //     required: true,
    // },
    // PayementAddress: {
    //     type: String,
    //     required: true,
    // },
    // NFTAddress: {
    //     type: String,
    //     required: true,
    // },
    // metadata: {
    //     duration:{
    //         type: Number,
    //         require: true,
    //     },
    //     discount:{
    //         type: Number,
    //         require: true,
    //     },
    // }
});

module.exports = mongoose.model('Campaign', campaignSchema);