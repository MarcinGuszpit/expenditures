const express = require("express");
const {check} = require("express-validator");
const {getAllUsers, addUser, updateUser} = require('./../model/users');
const {renderAllElements, renderRemoveElement, renderAddNewElement, renderUpdateElement} = require("./commonApi");
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


router.patch('/clients/update', [
    check("id").isInt().withMessage("Musisz podać nr id elementu!"),
    check("old_password")
    .notEmpty()
    .withMessage("Poprzednie hasło nie może być puste!"),
    check('password').notEmpty().isLength({min: 5})
    .withMessage('Hasło musi się składać z przynajmniej 5 znaków!'),
    check('new_password').custom((value, {req}) => {
        const formValues = {...req.body};
        if (formValues && formValues.password === value) {
            return true;
        }
        return false;
    }).withMessage('Wartość wpisana w to pole musi być taka sama jak hasło!'),
    check("name")
    .notEmpty()
    .withMessage("Nazwa użytkownika nie może być pusta!")
    .isLength({max: 35})
    .withMessage("Nazwa nie może być dłuższa niż 35 znaków!"),
],
renderUpdate);



function renderAll(req, res, next) {
    renderAllElements(req, res, next, getAllUsers);
}

function renderRemove(req, res, next) {
    renderRemoveElement(req, res, next, removeUser);
}

function renderAddNew(req, res, next) {
    renderAddNewElement(req, res, next, addUser);
}

function renderUpdate(req, res, next) {
    renderUpdateElement(req, res, next, updateUser);
}


module.exports = router;