const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllTaxRates,
  addTaxRate,
  changeTaxRate,
} = require("../model/taxRates");
const {
  renderAllElements,
  renderAddNewElement,
  renderUpdateElement,
} = require("./commonApi");
const { extractErrors } = require("../utils/utils");
const router = express.Router();

router.get("/tax-rates/all", renderAll);

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
  "/tax-rates/delete",
  check("id").isInt().withMessage("Musisz podać nr id elementu!"),
  renderRemove
);

router.use("/tax-rates", (req, res, next) => {
  res.status(403).json({
    status: "error",
    msg: "Nieobsługiwana metoda lub ścieżka",
  });
});

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
  const errors = validationResult(req).array();
}

module.exports = router;
