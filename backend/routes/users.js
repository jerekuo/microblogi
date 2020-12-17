const router = require("express").Router();
const crypto = require("crypto");
const passport = require("passport");

//hash passwords
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};
//Get user schema from user.model file
let User = require("../models/user.model");

//Get current user.
router.route("/").get((req, res) => {
  res.send(req.user); //store current user in req.user object if authentication
});

//Route for adding a new user, requires username and pasword
router.route("/add").post((req, res) => {
  //Check if username already exists
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists!");
    if (!doc) {
      const username = req.body.username;
      const unhashedpassword = req.body.password;
      //hash the password that is sent to DB using crypto with sha256
      const password = getHashedPassword(unhashedpassword);

      const newUser = new User({ username, password });

      newUser
        .save()
        .then(() => res.json("User added!")) //save user to DB and return confirm in JSON
        .catch((err) => res.status(400).json("Error: " + err)); //Catch error and return an error msg.
    }
  });
});

//Route for deleting user
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted succesfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Route for login, Check for a match in database for username and password
//If finds a match sets cookie with users credentials.
router.route("/login").post((req, res) => {
    passport.authenticate("local", (err,user,info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists!!!");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Succesful login!');
                console.log(req.user);
            })
        }
    })


  
});

module.exports = router;
