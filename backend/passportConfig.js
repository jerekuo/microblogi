const User = require("./models/user.model");
const crypto = require("crypto");
const localStrategy = require("passport-local").Strategy;

//hash passwords
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if (getHashedPassword(password) === user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.serializeUser((user,cb) => {
      cb(null, user.id);
  })
  passport.deserializeUser((id,cb) => {
      User.findOne({_id: id}, (err, user) => {
          cb(err, user)
      })

  })
};
