const createError = require('http-errors');
const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();



// view engine setup
// app.use('/static', express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);


// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use( (err, req, res, next) => {
    if(err.status === 404) {
        console.log(err);
        res.render('page-not-found', {err, title: "Page Not Found"});
    } else {
        const err = new Error();
        err.status = 500;
        console.log('Sorry the server encountered an issue, code: ' + err.status);
        res.render('error', {err, title: "Server Error"});
    }
  });

app.listen(3000, () => {
    console.log('The application is running on localhost: 3000')

});


module.exports = app;