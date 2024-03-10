const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

const keys = require('./keys');
const { EMAIL_PROVIDER } = require('../constants/index');

const { google, facebook, github } = keys;

const { secret } = keys.jwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            });
    })
);

module.exports = async app => {
    app.use(passport.initialize());

    await googleAuth();
    await facebookAuth();
    await githubAuth();
};

const googleAuth = async () => {
    try {

        passport.use(
            new GoogleStrategy(
                {
                    clientID: google.clientID,
                    clientSecret: google.clientSecret,
                    callbackURL: google.callbackURL
                },
                async (accessToken, refreshToken, profile, done) => {
                    User.findOne({ googleId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const name = profile.displayName.split(' ');
                            const newUser = new User({
                                googleId: profile.id,
                                username: `${name[0]} ${name[1]}`,
                                email: profile.email,
                                phoneNumber: profile.phoneNumber,
                                fullname: `${name[0]} ${name[1]}`,
                                provider: EMAIL_PROVIDER.Google,
                                photoimage: profile.picture,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                                __v: 1
                            });
                            newUser.save()
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);

                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );

    } catch (error) {
        console.log('Missing google keys');
    }
};

const facebookAuth = async () => {
    try {
        passport.use(
            new FacebookStrategy(
                {
                    clientID: facebook.clientID,
                    clientSecret: facebook.clientSecret,
                    callbackURL: facebook.callbackURL,
                    profileFields: [
                        'id',
                        'displayName',
                        'name',
                        'emails',
                        'picture.type(large)'
                    ]
                },
                (accessToken, refreshToken, profile, done) => {
                    User.findOne({ facebookId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const newUser = new User({
                                facebookId: profile.id,
                                username: `${profile.name.givenName}${profile.name.familyName}`,
                                email: profile.emails ? profile.emails[0].value : null,
                                fullname: `${profile.name.givenName}${profile.name.familyName}`,
                                provider: EMAIL_PROVIDER.Facebook,
                                photoimage: profile.photos[0].value,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                                __v: 1
                            });
                            newUser.__v = 1
                            newUser.save()
                            // console.log(newUser);
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);
                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );
    } catch (error) {
        console.log('Missing facebook keys');
    }
};

const githubAuth = async () => {
    try {
        passport.use(
            new GithubStrategy(
                {
                    clientID: github.clientID,
                    clientSecret: github.clientSecret,
                    callbackURL: github.callbackURL
                    // profileFields: [
                    //     'id',
                    //     'displayName',
                    //     'name',
                    //     'emails',
                    //     'picture.type(large)'
                    // ]
                },
                (accessToken, refreshToken, profile, done) => {
                    User.findOne({ githubId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            console.log(profile);
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const newUser = new User({
                                githubId: profile.id,
                                username: profile.username,
                                email: profile.profileUrl,
                                fullname: profile.displayName,
                                provider: EMAIL_PROVIDER.Github,
                                photoimage: profile.photos[0].value,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                            });
                            newUser.__v = 1
                            newUser.save()
                            // console.log(newUser);
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);
                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );
    } catch (error) {
        console.log('Missing github keys');
    }
};
