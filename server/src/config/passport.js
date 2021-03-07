import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import * as config from './index.js';
import * as UserService from '../services/user.service.js';

const usePassportStrategies = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser - user', user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser - id', id);
    UserService.getUser(id)
      .then((user) => {
        console.log('deserializeUser - user', user);
        done(null, user);
      })
      .catch((err) => done(null, false, { error: err }));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.secret,
        callbackURL: config.google.callbackUrl,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('Google profile', profile);

        UserService.getUserByGoogleId(profile.id).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            UserService.createUser({
              provider: profile.provider,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.picture,
              googleId: profile.id,
            }).then((user) => done(null, user));
          }
        });
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.secret,
        callbackURL: config.facebook.callbackUrl,
        profileFields: ['id', 'displayName', 'photos', 'emails'],
      },
      function (accessToken, refreshToken, profile, done) {
        console.log('Facebook profile', profile);
        const { id, email, name } = profile._json;

        UserService.getUserByFacebookId(profile.id)
          .then((existingUser) => {
            if (existingUser) {
              console.log('Existing user from Facebook', existingUser);
              done(null, existingUser);
            } else {
              UserService.createUser({
                provider: profile.provider,
                email,
                name,
                photo: profile.picture.data,
                facebookId: id,
              }).then((user) => {
                console.log('Created user from Facebook', user);
                done(null, user);
              });
            }
          })
          .catch((error) => console.log('Facebook login error', error));
      },
    ),
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
        secretOrKey: config.jwt.secret,
      },
      function (payload, done) {
        console.log('JwtStrategy - payload', payload);

        UserService.getUser(payload.id)
          .then((user) => {
            if (user) {
              done(null, user);
            } else {
              done('Incorrect username', null);
            }
          })
          .catch((err) => {
            done(err, null);
          });
      },
    ),
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
      },
      function (email, password, done) {
        UserService.getUserByEmail(email)
          .then((user) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }

            user.comparePassword(password, function (err, isMatch) {
              if (err) {
                return done(err);
              }

              if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
              }
              console.log('Passport email login successful', user);
              return done(null, user);
            });
          })
          .catch((err) => {
            return done(err);
          });
      },
    ),
  );
};

export default usePassportStrategies;
