const router = require('express').Router();

//Get post schema from post.model file
let Post = require('../models/post.model');

//Route for listing all posts in database
router.route('/').get((req, res) => {
    Post.find().then(posts => res.json(posts)) //If posts are found, return them in JSON format
    .catch(err => res.status(400).json('Error: '+ err)); //If error is catched return error message
});

//Route for adding a new post, requires message and the posting user max. 299 chars.
router.route('/add').post((req, res) => {
    const message = req.body.message;
    const user = req.body.user;

    const newPost = new Post({message, user});

    newPost.save().then(() => res.json('Post added!')) //save post to DB and return confirm in JSON
    .catch(err => res.status(400).json('Error: '+ err)); //Catch error and return an error msg.
});

//Route for deleting post
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted succesfully!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;