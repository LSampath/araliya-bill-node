const express = require('express');
const router = express.Router();

const UserController = require('../controller/user');

/**
 * POST
 * authenticate user from username, password
 */
router.post('/auth', (req, res) => {
    UserController.authUser(req.body.user_name, req.body.password).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send(result);
        }
    }).catch((err) => {
        res.status(400).send(err);
    })
});

/**
 * POST
 * add new user to the system
 */
router.post('/', (req, res) => {
    UserController.addUser(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

/**
 * GET
 * get all users
 */
router.get('/', (req, res) => {
    UserController.getUsers().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
});

/**
 * GET
 * get specific user, given access token
 */
router.get('/:access_token', (req, res) => {
    UserController.getUser(req.params.access_token).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

/**
 * PUT
 * update user details, given access token and new details
 */
router.put('/', (req, res) => {
    UserController.updateUser(req.headers['authorization'], req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports = router;