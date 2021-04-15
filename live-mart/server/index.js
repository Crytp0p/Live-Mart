const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI,{useNewUrlParser : true,useUnifiedTopology : true});

const app = express();

app.use(cookieSession({
    maxAge : 30*24*60*60*1000,
    keys : [keys.cookieSession]
}))

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(5000);