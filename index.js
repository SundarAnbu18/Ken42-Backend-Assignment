require('./db');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

var employeeController = require('./controller/user.controller');

app.use('/employees', employeeController);

// error handler
app.use((err ,req, res ) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.listen(3000)
console.log("listening to port 3000")