const express = require("express");
const { check} = require("express-validator");
const {
  getAllTaxRates,
  addTaxRate,
  changeTaxRate,
  getTaxRate,
  removeTaxRate
} = require("../model/taxRates");
const {
  renderAllElements,
  renderAddNewElement,
  renderUpdateElement,
  renderOneElement, 
  renderRemoveElement
} = require("./commonApi");

const router = express.Router();

router.get("/tax-rates/all", renderAll);

router.get('/tax-rates/elem/:id', renderOne);

router.post(
  "/tax-rates/add-new",
  [
    check("name")
      .notEmpty()
      .withMessage("Nazwa nie może być pusta")
      .isLength({ max: 35 })
      .withMessage("Nazwa nie może być dłuższa niż 35 znaków!"),
    check("rate")
      .notEmpty()
      .withMessage("Stawka podatku nie może być pusta!")
      .isDecimal({ decimal_digits: 2, locale: "pl-PL" })
      .withMessage("Musisz podać stawkę podatku w formacie xx,xx!"),
  ],
  renderAddNew
);

router.patch(
  "/tax-rates/update",
  [
    check("id").isInt().withMessage("Musisz podać nr id elementu!"),
    check("name")
      .notEmpty()
      .withMessage("Nazwa nie może być pusta!")
      .isLength({ max: 35 })
      .withMessage("Nazwa nie może dłuższa niż 35 znaków!"),
    check("rate")
      .notEmpty()
      .isDecimal({ decimal_digits: 2, locale: "pl-PL" })
      .withMessage("Musisz podać stawkę podatku w formacie xx,xx!"),
  ],
  renderUpdate
);

router.delete(
  "/tax-rates/delete/:id",
  renderRemove
);

function renderAll(req, res, next) {
  renderAllElements(req, res, next, getAllTaxRates);
}

function renderAddNew(req, res, next) {
  renderAddNewElement(req, res, next, addTaxRate);
}

function renderUpdate(req, res, next) {
  renderUpdateElement(req, res, next, changeTaxRate);
}

function renderRemove(req, res, next) {
  renderRemoveElement(req,res,next,removeTaxRate);
}

function renderOne(req, res, next) {
  renderOneElement(req,res,next,getTaxRate);
}

module.exports = router;
