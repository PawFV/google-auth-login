const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
   new GoogleStrategy({
      // OPTIONS FOR GOOGLE STRATEGY
      callbackURL: '/auth/google/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
   }, (accessToken, refreshToken, profile, done) => {
      // PASSPORT CALLBACK
      console.log(profile);

   })
)
