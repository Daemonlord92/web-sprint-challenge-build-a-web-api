const express = require('express');
const projectRouter = require('./api/project/projectRouter');
const actionRouter = require('./api/actions/actionRouter');

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({mes: "HI, from the backend"});
});

server.use('/projects', projectRouter);
server.use('/actions', actionRouter);


module.exports = server;
