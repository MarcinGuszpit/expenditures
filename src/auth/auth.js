const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

router.post('/login', [check('user').notEmpty().withMessage('Musisz podać nazwę użytkownika!'),
check('password').notEmpty().withMessage('Musisz podać hasło użytkownika!')], loginUser);

function loginUser(req, res, next) {
    res.status(200).json({ status: 'ok' });
}


module.exports = router;