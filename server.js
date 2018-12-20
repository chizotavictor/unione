'use strict'
// require('rootpath')();
const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan  = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorHandler = require('./_helpers/error-handler')
const config = require('./config.json')
const app = express();

app.server = http.createServer(app);

require('./routes') (app)

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

// global error handler
app.use(errorHandler);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orgin', '*')
    res.header('Access-Control-Allow-Header', 'Orgin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
})
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

require('./db') (mongoose)

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
})

