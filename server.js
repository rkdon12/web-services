//require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.json()); //parse json bodies;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());// enhance resful api
app.use(cors());// cors for all request
app.use(morgan('combined'));

//api Routes
app.use('/users', require('./users/users.controller'));

//global error Handler
app.use(errorHandler);

//start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3003;
app.listen(port, () => console.log('Server listening on port' +  port));
