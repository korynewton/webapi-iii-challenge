const express = require('express');

const server = express();

//handle routing

server.get('/', (req, res) => {
    res.status(200).json({  message:' GET success'})
})



//export
module.exports = server;