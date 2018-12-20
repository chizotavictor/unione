const express = require('express');
const router = express.Router();
const userService = require('../services/User');

router.post('/register', register);

module.exports = router;

function register(req, res, next) {
    // if (req.body === undefined) return res.status(422).send({ error: 'Empty body'})
    console.log(req.query)
    userService.create(req.query)
        .then(() => res.json({}))
        .catch(err => next(err));
}