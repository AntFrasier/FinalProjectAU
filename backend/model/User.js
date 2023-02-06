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
    roles: {
        User: {
            type: Number,
            default: 1001,
        },
        Client: Number,
        Admin: Number,
    },
    webSite: String,
    signedHash: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('User', userSchema);