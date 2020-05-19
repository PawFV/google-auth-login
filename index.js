const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const passportSetup = require('./config/passport-setup');

// VIEW ENGINE
app.set('view engine', 'ejs');

// AUTH ROUTES
app.use('/auth', require('./routes/auth-routes'));

// Home route
app.get('/', (req, res) => {
   res.render('home');
})

app.listen(port, () => console.log(`Example app listening on port 3000!`));





