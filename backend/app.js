var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')({origin: true});
require('dotenv').config();

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log(`connection to DB established`)})
.catch(err=>{console.log(err)})

app.get('/', (req, res)=>{
    res.redirect('/news')
})
app.use('/news', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
