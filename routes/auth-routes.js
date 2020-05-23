const router = require('express').Router();
const passport = require('passport')

// Auth login
router.get('/login', (req, res) => {
   res.render('login', { user: req.user });
})

router.get('/logout', (req, res) => {
   req.logOut();
   res.redirect('/')
})

// FACEBOOK LOGIN
router.get('/facebook', passport.authenticate('facebook', {
   scope: ['email']
}));



// CALLBACK GOOGLE FOR REDIRECT
router.get('/facebook/redirect',
   passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
   }));


// GOOGLE LOGIN
router.get('/google', passport.authenticate('google', {
   scope: ['profile']
})
)

// CALLBACK GOOGLE FOR REDIRECT
router.get('/google/redirect', passport.authenticate('google'),
   (req, res) => {
      res.redirect('/profile')
   })

module.exports = router;