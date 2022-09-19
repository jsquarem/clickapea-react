const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/test'// < replace with your database name!

);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});