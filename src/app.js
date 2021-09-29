const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const loggingService = require('./application/loggingService');
const rid = require('connect-rid');
const morgan = require('morgan');
const port = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(rid());
app.use(morgan('combined',{
    stream: {
        write: function (message) {
            return loggingService.info(message.trim());
        }
    }
}));

var homeRouter = require('./components/home/homeRoute');
var usersRouter = require('./components/users/usersRoute');

app.use('/', homeRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
    return next(new createError(404));
});

app.use(function (err, req, res, next) {

    loggingService.error(err.stack);

    res.status(err.status || 500);
    return res.jsonp({
        status: err.status || 500,
        message: err.message
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
