const mongoose = require('mongoose');

const schema = mongoose.Schema;

//Schema for user
const Post = new mongoose.Schema({
    message: {type: String, required: true, trim: true, minlength: 1, maxlength: 299},
    user: {type:String, required:true},
}, {
    timestamps: true,

});

//creating exportable model
const exportPost = mongoose.model('Post', Post);

//exporting the model
module.exports = exportPost;