const express = require("express");
const {check} = require("express-validator");
const {getAllUsers, addUser} = require('./../model/users');
const {renderAllElements, renderRemoveElement, renderAddNewElement} = require("./commonApi");
const {removeUser} = require("../model/users");
const router = express.Router();

router.get("/users/all", renderAll);

router.delete(
    "/users/delete/:id",
    renderRemove
);

router.post(
    "/users/add-new",
    [
        check("name")
            .notEmpty()
            .withMessage("Nazwa użytkownika nie może być pusta!")
            .isLength({max: 35})
            .withMessage("Nazwa nie może być dłuższa niż 35 znaków!"),
        check("login")
            .notEmpty()
            .withMessage("Login użytkownika nie może być pusty!")
            .isLength({max: 35})
            .withMessage("Login nie może być dłuższy niż 35 znaków!"),
        check("password")
            .notEmpty().withMessage('Hasło nie może być puste!')
            .isLength({min: 8}).withMessage("Hasło musi mieć przynajmniej 8 znaków!")
    ],
    renderAddNew
);

function renderAll(req, res, next) {
    renderAllElements(req, res, next, getAllUsers);
}

function renderRemove(req, res, next) {
    renderRemoveElement(req, res, next, removeUser);
}

function renderAddNew(req, res, next) {
    renderAddNewElement(req, res, next, addUser);
}

module.exports = router;