const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const auth = require('./routes/auth');

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/classroom' ,
  {useNewUrlParser: true}, () => {
  console.log("connected to mongodb");
})


app.use('/api', auth);

app.listen(3001, () => {
  console.log("server is listening at 3001");
});