var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
var app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log(`connection to DB established`)})
.catch(err=>{console.log(err)})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var allowedOrigins = ['https://littlenews.onrender.com','https://littlenews-api.onrender.com/news/scrap','https://littlenews.onrender.com/scrap'];
app.use(cors({
  origin: (origin, callback)=>{
    if(allowedOrigins.indexOf(origin) !== -1 || !origin){
        callback(null, true)
    }
    else{
        callback(new Error('Not allowed by CORS policy'))
    }
  },
  optionsSuccessStatus: 200
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res)=>{
    res.redirect('/news')
})
app.use('/news', indexRouter);
app.use('/users', usersRouter);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

module.exports = app;
