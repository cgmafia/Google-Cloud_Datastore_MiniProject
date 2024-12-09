const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');

passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleAuth.clientId,
            clientSecret: config.googleAuth.clientSecret,
            callbackURL: config.googleAuth.redirectUri
        },
        (accessToken, refreshToken, profile, done) => done(null, profile)
    )
);

function authenticate(req, res, next) {
    passport.authenticate('google', { session: false })(req, res, next);
}

module.exports = authenticate;
