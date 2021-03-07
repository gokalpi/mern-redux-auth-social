import express from 'express';
import passport from 'passport';

import * as AuthController from '../controllers/auth.controller.js';
import requireJwtAuth from '../middleware/requireJwtAuth.js';
import requireLocalAuth from '../middleware/requireLocalAuth.js';
import { loginValidation, registerValidation } from '../validations/auth.validation.js';

const router = express.Router();

// Facebook login
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
    session: true,
  }),
);

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

// Local login
router.get('/current', requireJwtAuth, AuthController.getCurrentUser);
router.post('/login', loginValidation, requireLocalAuth, AuthController.login);
router.get('/login/success', AuthController.loginSuccess);
router.get('/login/failed', AuthController.loginFailed);
router.get('/logout', AuthController.logout);
router.post('/register', registerValidation, AuthController.register);

export default router;
