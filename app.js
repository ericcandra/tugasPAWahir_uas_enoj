var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayout = require("express-ejs-layouts");
const cors = require("cors");
const connectDB = require("./app_api/models/db");


const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const bukuRouter = require('./app_server/routes/buku');
const peminjamanRouter = require('./app_server/routes/peminjaman');

const authRouterApi = require("./app_api/routes/auth");
const bukuRouterApi = require("./app_api/routes/buku");
const peminjamanRouterApi = require("./app_api/routes/peminjaman");
const anggotaRouterApi = require("./app_api/routes/anggota");
const dendaRouterApi = require("./app_api/routes/denda");

require("dotenv").config();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, "app_server", 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buku', bukuRouter);
app.use('/peminjaman', peminjamanRouter);

app.use("/api/auth", authRouterApi);
app.use("/api/buku", bukuRouterApi);
app.use("/api/peminjaman", peminjamanRouterApi);
app.use("/api/anggota", anggotaRouterApi);
app.use("/api/denda", dendaRouterApi);



connectDB();

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
