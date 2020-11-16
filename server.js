require('dotenv').config();
const todoRouter = require('./routes/tasks')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')
const log = require('./middleware/log')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Referer, User-Agent");
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Credentials', true)

    next();
});
app.use(bodyParser.json())
app.use(log)
app.use(todoRouter, loginRouter, userRouter)
app.use(log)

var server = app.listen(process.env.port, function () {
    console.log('server started')
})
