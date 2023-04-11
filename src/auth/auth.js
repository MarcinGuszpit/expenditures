const express = require('express');
const jwt = require('jsonwebtoken');
const { check } = require("express-validator");
const { isUserAuthenticated } = require('../model/users');
const { jwtKey } = require('../settings/settings');
const router = express.Router();

router.post('/login', [check('login').notEmpty().withMessage('Musisz podać nazwę użytkownika!'),
check('password').notEmpty().withMessage('Musisz podać hasło użytkownika!')], loginUser);

function loginUser(req, res, next) {
    const errors = validationResult(req).array();
    const user = req.body;
    if (errors.length === 0) {
        isUserAuthenticated(user).then((isAuth) => {
            const token = jwt.sign({ login: user.login }, jwtKey, { expiresIn: '8h' });
            res.status(200).json({ status: 'ok', token });
        }).catch(() => {
            res.status(401).json({ status: 'error', message: "Nie udało się zalogować użytkownika!" })
        });
    }
    else {
        const validationErrors = extractErrors(errors);
        res.status(422).json({
            status: "error",
            message: "Błąd walidacji danych!",
            errors: validationErrors,
        });
    }
}

function isAuthenticated(req, res, next) {
    const token = req.get('Authorization');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtKey);
    } catch {
        decodedToken = undefined;
    }
    if (decodedToken) {
        req.loggedUser = decodedToken.login;
        req.loggedName = decodedToken.name;
        req.loggedId = decodedToken.id;
        next();
    }
    throw Error('Użytkownik nie zalogowany');
}

module.exports = {
    router, 
    isAuthenticated
};