require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 4000;
const greeting = process.env.GREETING;

server.listen(port , () => {
    console.log(`\n** ${greeting}, we are up and running on port ${port}**`)
})