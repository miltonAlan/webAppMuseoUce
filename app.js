var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Configurar la carpeta estática para servir archivos estáticos como JS, imágenes, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Configurar la carpeta estática del build para servir archivos generados por React (ej. JS, imágenes, CSS)
app.use(express.static(path.join(__dirname, 'build')));

// Configurar el motor de vistas y las rutas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configurar las rutas de tu aplicación
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 y pasar al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // set locals, solo proporcionar error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

// Configurar la regla para servir el index.html para todas las demás rutas
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
