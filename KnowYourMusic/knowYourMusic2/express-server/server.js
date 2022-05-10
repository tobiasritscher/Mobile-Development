const express = require('express');
const dataRouter = require('./routes/data')
const authRouter = require('./routes/auth')
const fs = require("fs");
const path = require("path");

// Loads env variables
require('dotenv').config()
const app = express();

const cors = require('cors')
app.use(cors())

// specifies what port to run the server on
const PORT = process.env.PORT || 8080;
// Adds json parsing middleware to incoming requests
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api', dataRouter)

// error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

// --------- Nginx configuration -----------
//open Socket to talk to nginx
const socketDir = path.join(__dirname, 'run')
const socketFile = path.join(socketDir, 'zunft.sock')

// Create socket dir
if (!fs.existsSync(socketDir)) {
    fs.mkdirSync(socketDir)
}

// Remove old socket file if exists
if (fs.existsSync(socketFile)) {
    fs.unlinkSync(socketFile)
}

// Listen on opened socket
server = app.listen(socketFile, () => {
    fs.chmodSync(socketFile, '777')
    console.log("Server ready...")
})
// --------- Nginx configuration end -----------