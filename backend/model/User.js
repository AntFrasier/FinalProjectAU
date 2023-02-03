const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    address: {
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 1001
        },
        Client: Number,
        Admin: Number
    }
});

module.exports = mongoose.model('User', userSchema);