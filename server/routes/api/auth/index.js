// ============================
// Node Requires
// ============================

const VerifyToken = require('./VerifyToken');

const express  = require('express');
const router = express.Router();

const { User } = require('../../../models/schema');

// ============================
// Auth Routes
// ============================

router.get('/me', VerifyToken, function(req, res, next) {
    User.query().first().where({ user_name: req.userId })
        .then(user => {
            if (!user) return res.status(404).send({ errors: [{
                title: 'User not found.',
                detail: 'No data on user.'
            }]});

            return res.status(200).send({ data: {
                userId: user.user_name,
                userFullName: user.user_first_name + ' ' + user.user_last_name,
                userEmail: user.user_email,
                userRole: user.user_authorization_role,
            }});
        })
        .catch(error => {
            return res.status(500).send({ errors: [{
                title: 'Query error.',
                detail: 'A problem occured with the query request.'
            }]});
        });
});

router.post('/register', (req, res) => {
    const newUserValues = {
        user_name: req.body.userName,
        user_email: req.body.userEmail,
        user_password: req.body.userPassword,
        user_first_name: req.body.userFirstName,
        user_last_name: req.body.userLastName,
    };

    User.query()
        .insert(newUserValues)
        .then(newUser => {
            if (!newUser.isActive()) {
                //
            }

            return res.status(200).send({ data: {
                userId: newUser.user_name,
                userEmail: newUser.user_email,
                userFirstName: newUser.user_first_name,
                userLastName: newUser.user_last_name,
                userActive: newUser.isActive()
            }});
        })
        .catch(err => {
            if (err) return res.status(500).send({ errors: [{
                title: 'Unable to register.',
                detail: 'There was a problem registering the user.'
            }]});
        });
});


router.post('/login', (req, res) => {
    User.query()
        .first()
        .where({ user_email: req.body.userEmail })
        .then(user => {
            // if user not found
            if (!user) return res.status(404).send({ errors: [{
                title: 'Unable to authenticate.',
                detail: 'No user / password combination.'
            }]});
            
            // if user isnt activated yet
            if (!user.isActive()) return res.status(401).send({ errors: [{
                title: 'Unable to authenticate.',
                detail: 'The user is not active, please activate the user.'
            }]});

            // check the password
            const passwordIsValid = user.verifyPassword(req.body.userPassword);
            // if the password isnt valid
            if (!passwordIsValid) return res.status(401).send({ errors: [{
                title: 'Unable to authenticate.',
                detail: 'No user / password combination.'
            }]});

            //success, return token
            return res.status(200).send({ data: {
                authenticated: true,
                token: user.getToken() 
            }});

        })
        .catch(err => {
            if (err) return res.status(500).send({ errors: [ { 
                title: 'Server Error.', 
                detail: 'Error on the server.'
            }]});
        });
});

module.exports = router;