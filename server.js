const express = require('express');

const usersRoutes = require('./routes/users-routes')
const postsRoutes = require('./routes/posts-routes')


const server = express();

//handle routing

server.get('/', (req, res) => {
    res.status(200).json({  message:' GET success'})
})

server.use('/users', usersRoutes)
server.use('/posts', postsRoutes)



//export
module.exports = server;