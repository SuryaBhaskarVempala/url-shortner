const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true,
        default: "USER",
    }
}, { timestamps: true });

schema.statics.handleDuplicateKeyError = async function (email) {
    const existingUser = await this.findOne({ email });
    if(existingUser){
        throw new Error("User exists");
    }
};

const User = mongoose.model('users', schema);

module.exports = User;
