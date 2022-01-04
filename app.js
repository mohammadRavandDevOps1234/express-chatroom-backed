let { compareAsc, format } = require('date-fns');


const { Sequelize } = require('sequelize');
const helmet = require("helmet");
const Joi = require('joi');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sequelize} = require('./database/mysqlConnect');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var consumerRouter = require('./routes/consumer');
var roomRouter = require('./routes/room');
var storeRouter = require('./routes/store');
var companyRouter = require('./routes/company');
var consumerstoreRouter = require('./routes/consumerstore');
var agencyActivityAreasRouter = require('./routes/agencyActivityAreas');
var agencyRouter = require('./routes/agency.js');





var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// app.use(cors());

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();



app.use('/users', usersRouter);
app.use('/consumers', consumerRouter);
app.use('/rooms', roomRouter);
app.use('/consumerstores', consumerstoreRouter);
app.use('/stores', storeRouter);
app.use('/companies', companyRouter);
app.use('/agencyActivityAreas', agencyActivityAreasRouter);
app.use('/agencies', agencyRouter);
app.use('/', indexRouter);
app.use('404', (req, res, next) => {
    res.sendStatus(404);
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;