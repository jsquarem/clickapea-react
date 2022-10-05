require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./server/config/database');

const app = express();

// TODO: uncomment on deploy
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./server/config/auth'));
app.use('/api/users', require('./server/routes/api/users'));
app.use('/api/recipes', require('./server/routes/api/recipes'));
app.use('/api/planner', require('./server/routes/api/planner'));
// "catch all" route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});
