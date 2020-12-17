const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser')

//dotenv for environment variables
require('dotenv').config();

//express server creating
const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true

}));

app.use(express.json());
app.use(cookieParser("secretcode"));

//Use passport
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}))

//Connecting to mongoDB database via mongoose
const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection successful!");
})

//Using routes
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');

app.use('/posts', postRouter);
app.use('/users', userRouter);

//Starting the server.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
