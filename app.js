const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors");
const passport = require("./config/passport");
const session = require('express-session');


const whitelist = [
  "http://food-ladder-bucket.s3-website-ap-southeast-2.amazonaws.com",
  "http://localhost:3000"
]

app.use(cors({
  origin: (origin, callback) => {
    if(whitelist.inddexOf(origin) !== -1) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed. Blocked by CORS.'))
    }
  }
}));

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
}));

app.use(morgan('combined'));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

app.use(express.static('public'));

app.use(require('./middleware/error_handler_middleware'));

require('./database/connect');

module.exports = app;
