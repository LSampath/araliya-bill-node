const express = require('express');
const router = express.Router();

const UserController = require('../controller/user');

/**
 * POST
 * authenticate user from username, password
 */
router.post('/auth', (req, res) => {
    UserController.authUser(req.body.username, req.body.password).then((result) => {
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
 *
 */
router.get('/', (req, res) => {
    UserController.getUsers().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/:user_id', (req, res) => {
    UserController.getUser(req.body.user_id).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports = router;