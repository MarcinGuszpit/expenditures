const express = require('express');
const { getAllClients, addClient, changeClient, removeClient, getClient } = require('./../model/clients');
const {
    renderAllElements,
    renderAddNewElement,
    renderUpdateElement,
    renderOneElement,
    renderRemoveElement
} = require("./commonApi");
const { check } = require("express-validator");
const router = express.Router();

router.get('/clients/all', renderAll);

router.post('/clients/add-new', check("short_name")
    .notEmpty()
    .withMessage("Skrócona nazwa nie może być pusta")
    .isLength({ max: 35 })
    .withMessage("Nazwa nie może być dłuższa niż 35 znaków!"), renderAddNew);

router.patch('/clients/update', [
    check("id").isInt().withMessage("Musisz podać nr id elementu!"),
    check("short_name")
        .notEmpty()
        .withMessage("Skrócona nazwa nie może być pusta")
        .isLength({ max: 35 })
        .withMessage("Nazwa nie może być dłuższa niż 35 znaków!")
],
    renderUpdate);

router.delete('/clients/delete/:id', renderRemove);

router.get('/clients/elem/:id', renderOne);

function renderAll(req, res, next) {
    renderAllElements(req, res, next, getAllClients);
}

function renderAddNew(req, res, next) {
    renderAddNewElement(req, res, next, addClient);

}

function renderUpdate(req, res, next) {
    renderUpdateElement(req, res, next, changeClient);

}

function renderRemove(req, res, next) {
    renderRemoveElement(req, res, next, removeClient);
}

function renderOne(req, res, next) {
    renderOneElement(req, res, next, getClient);
}


module.exports = router;