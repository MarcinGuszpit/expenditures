const express = require("express");
const { check } = require("express-validator");
const { getAllUsers } = require('./../model/users');

router.get("/users/all", renderAll);

function renderAll(req, res, next) {
    renderAllElements(req, res, next, getAllUsers);
}

module.exports = router;