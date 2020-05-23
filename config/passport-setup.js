const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/Users');
require('dotenv').config();


passport.serializeUser((user, done) => {

   done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id);
      done(null, user);

   } catch (error) {
      done(null, null)
   }
})

passport.use(
   new GoogleStrategy({
      // OPTIONS FOR GOOGLE STRATEGY
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
   }, async (accessToken, refreshToken, profile, done) => {
      // PASSPORT CALLBACK
      try {
         const userExists = await User.findOne({ googleId: profile.id })
         if (userExists) return done(null, userExists)

         const user = new User({
            username: profile.displayName,
            googleId: profile.id,
            imageUrl: profile._json.picture
         })
         await user.save();

         return done(null, user);

      } catch (error) {
         console.log(error);
      }
   })
);


passport.use(new FacebookStrategy({
   clientID: process.env.FACEBOOK_APP_ID,
   clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
   callbackURL: "http://localhost:3000/auth/facebook/redirect"

}, async (accessToken, refreshToken, profile, done) => {
   try {

      console.log(profile)
      const userExists = await User.findOne({ facebookId: profile.id })
      if (userExists) return done(null, userExists)

      const user = new User({
         username: profile.displayName,
         facebookId: profile.id
      })

      await user.save();
      done(null, user);
   } catch (error) {
      console.log(error);
   }
}
));