const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
}, (err) => {
   if (!err) {
      console.log('Mongo online :]')
   } else {
      console.log('Error in DB connection: ' + err)
   }
});

// COOKIE SESSION
app.use(cookieSession({
   maxAge: 24 * 60 * 60 * 1000,
   keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

// VIEW ENGINE
app.set('view engine', 'ejs');

// AUTH ROUTES
app.use('/auth', require('./routes/auth-routes'));
app.use('/profile', require('./routes/profile-routes'));

// Home route
app.get('/', (req, res) => {
   res.render('home', { user: req.user });
})

app.listen(PORT, () => console.log(`node online. PORT -> ${PORT}`));





