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
        required: true,
    },

});//

module.exports = mongoose.model('User', userSchema);