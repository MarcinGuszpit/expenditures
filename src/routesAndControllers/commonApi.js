const { validationResult } = require("express-validator");

function renderAllElements(req, res, next, dataBasePromiseFunction) {
  dataBasePromiseFunction()
    .then((results) => {
      if (results.error) {
        res.status(400).json({
          status: "error",
          message: "Błąd operacji w bazie danych!",
        });
      } else {
        res.status(200).json({ status: "ok", results });
      }
    })
    .catch((err) => {
      res.status(400).json({
        status: "error",
        message: "Wystąpił nieokreślony błąd bazy danych!",
      });
    });
}

function renderAddNewElement(req, res, next, dataBasePromiseFunction) {
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    dataBasePromiseFunction(req.body)
      .then((results) => {
        if (results.error) {
          res.status(400).json({
            status: "error",
            message: "Błąd operacji w bazie danych!",
          });
        } else {
          res.status(201).json({
            status: "ok",
            message: "Dodano element do tablicy stawki podatków!",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          message: "Wystąpił nieokreślony błąd bazy danych!",
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

function renderUpdateElement(req, res, next, dataBasePromiseFunction) {
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    const { id } = req.body;
    dataBasePromiseFunction(id, { ...req.body })
      .then((results) => {
        if (results.error) {
          res.status(400).json({
            status: "error",
            message: "Błąd operacji w bazie danych!",
          });
        } else {
          res.status(200).json({
            status: "ok",
            message: "Zmieniono wartość stawki podatku!",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          message: "Wystąpił nieokreślony błąd bazy danych!",
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

module.exports = {
  renderAllElements,
  renderAddNewElement,
  renderUpdateElement,
};
