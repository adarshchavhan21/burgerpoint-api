const passport = require('passport');
const { myProfile, logout, setAddress, getAllUsers } = require('../contollers/authController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL
}))

router.get('/me', auth, myProfile);
router.get('/logout', auth, logout);
router.post('/address', auth, setAddress);

router.get('/users', auth, getAllUsers);

module.exports = router;