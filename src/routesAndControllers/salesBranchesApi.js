const express = require("express");
const {
  getAllBranches,
  addBranch,
  changeBranch,
  getBranch,
  removeBranch
} = require("./../model/salesBranches");
const { check, validationResult } = require("express-validator");
const {
  renderAllElements,
  renderAddNewElement,
  renderUpdateElement,
  renderOneElement,
  renderRemoveElement
} = require("./commonApi");
const router = express.Router();

router.get("/sales-branches/all", renderAll);

router.post(
  "/sales-branches/add-new",
  check("name")
    .notEmpty()
    .withMessage("Nazwa nie może być pusta!")
    .isLength({ max: 50 })
    .withMessage("Nazwa nie może dłuższa niż 35 znaków!"),
  renderAddNew
);

router.patch(
  "/sales-branches/update",
  [
    check("id").isInt().withMessage("Musisz podać nr id elementu!"),
    check("name")
      .notEmpty()
      .withMessage("Nazwa nie może być pusta!")
      .isLength({ max: 35 })
      .withMessage("Nazwa nie może dłuższa niż 35 znaków!"),
  ],
  renderUpdate
);

router.delete("/sales-branches/delete/:id", renderRemove);

router.get('/sales-branches/elem/:id', renderOne);

function renderAll(req, res, next) {
  renderAllElements(req, res, next, getAllBranches);
}

function renderAddNew(req, res, next) {
  renderAddNewElement(req, res, next, addBranch);
}

function renderUpdate(req, res, next) {
  renderUpdateElement(req, res, next, changeBranch);
}

function renderOne(req, res, next) {
  renderOneElement(req, res, next, getBranch);
}

function renderRemove(req, res, next) {
  renderRemoveElement(req, res, next, removeBranch);
}

module.exports = router;
