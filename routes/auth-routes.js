const router = require('express').Router();
const passport = require('passport')

// Auth login
router.get('/login', (req, res) => {
   res.render('login');
})


router.get('/logout', (req, res) => {
   res.send('logout');
})

router.get('/google', passport.authenticate('google', {
   scope: ['profile']
})
)

// CALLBACK GOOGLE FOR REDIRECT
router.get('/google/redirect', passport.authenticate('google'),
   (req, res) => {
      res.send("You reached a callback URI");
   })

module.exports = router;