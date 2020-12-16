const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//dotenv for environment variables
require('dotenv').config();

//express server creating
const app = express();
const port = process.env.PORT || 5000;

//Middleware to be able to parse JSON
app.use(cors());
app.use(express.json());

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
