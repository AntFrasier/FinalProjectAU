const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
            type: Number,
            default: 1001,
    },
    webSite: String,
    signedHash: {
        type: String,
        required: false,
    },
    nonce: {
        type: Number,
        default: 0
    },
    refreshToken: String,
    

});//

module.exports = mongoose.model('User', userSchema);