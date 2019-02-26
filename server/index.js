const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/classroom' ,
  {useNewUrlParser: true}, () => {
  console.log("connected to mongodb");
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, access-key');
  next();
})

app.use('/api', auth);

app.listen(3001, () => {
  console.log("server is listening at 3001");
});