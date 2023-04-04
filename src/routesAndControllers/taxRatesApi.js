const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllTaxRates,
  addTaxRate,
  changeTaxRate,
} = require("../model/taxRates");
const { extractErrors } = require("../utils/utils");
const router = express.Router();

const objFields = ["id", "name", "rate", "selected"];

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
    check("id").notEmpty().isInt().withMessage("Musisz podać nr id elementu!"),
    check("name")
      .notEmpty()
      .isLength({ max: 35 })
      .withMessage("Nazwa nie może być pusta i dłuższa niż 35 znaków!"),
    check("rate")
      .notEmpty()
      .isDecimal({ decimal_digits: 2, locale: "pl-PL" })
      .withMessage("Musisz podać stawkę podatku w formacie xx,xx!"),
  ],
  renderUpdate
);

router.delete(
  "/tax-rates/delete",
  check("id").notEmpty().isInt().withMessage("Musisz podać nr id elementu!"),
  renderRemove
);

router.use("/tax-rates", (req, res, next) => {
  res.status(403).json({
    status: "error",
    msg: "Nieobsługiwana metoda lub ścieżka",
  });
});

function renderAll(req, res, next) {
  getAllTaxRates()
    .then((results) => {
      res.status(200).json({ status: "ok", results });
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        error: err,
      });
    });
}

function renderAddNew(req, res, next) {
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    addTaxRate(req.body)
      .then(() => {
        res.status(201).json({
          status: "ok",
          message: "Dodano element do tablicy stawki podatków!",
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          error: err,
        });
      });
  } else {
    const validationErrors = extractErrors(errors);
    res.status(422).json({
      status: "error",
      msg: "Błąd walidacji danych!",
      errors: validationErrors,
    });
  }
}

function renderUpdate(req, res, next) {
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    const { id } = req.body;
    changeTaxRate(id, { ...req.body })
      .then(() => {
        res.status(200).json({
          status: "ok",
          message: "Zmieniono wartość stawki podatku!",
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          error: err,
        });
      });
  } else {
    const validationErrors = extractErrors(errors);
    res.status(422).json({
      status: "error",
      msg: "Błąd walidacji danych!",
      errors: validationErrors,
    });
  }
}

function renderRemove(req, res, next) {
  const errors = validationResult(req).array();
}

module.exports = router;
