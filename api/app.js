var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var roleRouter = require('./routes/role');
var permissionRouter = require('./routes/permission');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Users

app.get('/users', userRouter.getUsers)
app.get('/users/:id', userRouter.getUserById)
app.get('/users/:id/permissions', userRouter.getPermissionsByUser)
app.post('/users', userRouter.createUser)
app.put('/users/:id', userRouter.updateUser)
app.delete('/users/:id', userRouter.deleteUser)

// Roles

app.get('/roles', roleRouter.getUsers)
app.get('/roles/:id', roleRouter.getUserById)
app.get('/roles/:id/users', roleRouter.getUsersByRole)
app.post('/roles', roleRouter.createUser)
app.put('/roles/:id', roleRouter.updateUser)
app.delete('/roles/:id', roleRouter.deleteUser)

// Permissions

app.get('/permissions', permissionRouter.getUsers)
app.get('/permissions/:id', permissionRouter.getUserById)
app.post('/permissions', permissionRouter.createUser)
app.put('/permissions/:id', permissionRouter.updateUser)
app.delete('/permissions/:id', permissionRouter.deleteUser)

// RolePermissions



// Artist


// Album


// Genre


// MediaType


// Track




// 


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
