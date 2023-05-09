const passport = require('passport');
const {Strategy:GoogleStrategy} = require('passport-google-oauth20');
const User = require('../models/User');

exports.passportSetup = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL 
    }, async(accessToken, refreshToken, profile, done)=>{
        const {id, displayName:name, emails, photos } = profile;
        const user = await User.findOne({id});
        if(user){
            done(null, user);
        }else{
            const newUser = await User.create({
                id, name,
                email: emails[0].value,
                photo: photos[0].value
            });
            done(null, newUser);
        }
    }));
    
    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser(async(user, done)=>{
        done(null, user);
    })
}