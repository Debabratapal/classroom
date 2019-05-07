const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const auth = require('./routes/auth');
const room = require('./routes/room');
const booking = require('./routes/booking');
const user = require('./routes/user');

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/classroom' 
,{useNewUrlParser: true}, () => {
  console.log("connected to mongodb");
})

app.use('/api', auth);
app.use('/api/room', room);
app.use('/api/booking', booking);
app.use('/api/user', user);


app.listen(4000, () => {
  console.log("server is listening at 4000");
});
