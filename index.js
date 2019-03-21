require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 4000;
const greeting = process.env.GREETING;

server.listen(4000 , () => {
    console.log('\n** ${greeting} up and running on port ${port}**')
})