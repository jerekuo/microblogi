const router = require('express').Router();

//Get user schema from user.model file
let User = require('../models/user.model');

//Route for listing all users in database
router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)) //If users are found, return them in JSON format
    .catch(err => res.status(400).json('Error: '+ err)); //If error is catched return error message
});
//Route for adding a new user, requires username and pasword
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username, password});

    newUser.save().then(() => res.json('User added!')) //save user to DB and return confirm in JSON
    .catch(err => res.status(400).json('Error: '+ err)); //Catch error and return an error msg.
});

//Route for deleting user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted succesfully!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;