const mongoose = require('mongoose');

const schema = mongoose.Schema;

//Schema for user
const User = new mongoose.Schema({
    username: {type: String, required: true, trim: true, minlength: 4, unique: true},
    password: {type: String, required: true, minlength: 8},
}, {
    timestamps: true,

});

//creating exportable model
const exportUser = mongoose.model('User', User);

//exporting the model
module.exports = exportUser;