// import
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const recipeRoutes = require('./api/routes/recipes');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// mongoose
mongoose.connect('mongodb+srv://dinner:' + process.env.db_pass + '@letdodinner-d3sve.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true } );

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors-error handeling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
   next(); 
});

// go to routes
app.use('/recipes', recipeRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);


// catch error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;