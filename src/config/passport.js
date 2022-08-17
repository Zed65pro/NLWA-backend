const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const UserModel = require("../models/user");

const passportSetup = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        passReqToCallback: true,
      },
      async (accessToken, refreshToken, obj, profile, done) => {
        try {
          let user = await UserModel.findOne({ googleId: profile.id });
          if (user) done(null, user);
          else {
            user = await UserModel.create({
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              fullName: profile.displayName,
              email: profile.emails[0].value,
            });
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => done(err, user));
  });
};

module.exports = passportSetup;
