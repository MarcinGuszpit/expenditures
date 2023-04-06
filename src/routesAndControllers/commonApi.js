const { validationResult } = require("express-validator");

function renderAllElements(req, res, next, dataBasePromiseFunction) {
  dataBasePromiseFunction()
    .then((results) => {
      if (results.error) {
        rednerError(res, 400, "Błąd operacji w bazie danych!");
      } else {
        res.status(200).json({ status: "ok", results });
      }
    })
    .catch(err => rednerError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}

function renderAddNewElement(req, res, next, dataBasePromiseFunction) {
  const errors = validationResult(req).array();
  if (errors.length === 0) {
    dataBasePromiseFunction(req.body)
      .then((results) => {
        if (results.error) {
          rednerError(res, 400, "Błąd operacji w bazie danych!");
        } else {
          res.status(201).json({
            status: "ok",
            message: "Dodano element do tablicy stawki podatków!",
          });
        }
      })
      .catch(err => rednerError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
  } else {
    const validationErrors = extractErrors(errors);
    res.status(422).json({
      status: "error",
      message: "Błąd walidacji danych!",
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
          rednerError(res, 400, "Błąd operacji w bazie danych!");
        } else {
          res.status(200).json({
            status: "ok",
            message: "Zmieniono wartość stawki podatku!",
          });
        }
      })
      .catch(err => rednerError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
  } else {
    const validationErrors = extractErrors(errors);
    res.status(422).json({
      status: "error",
      message: "Błąd walidacji danych!",
      errors: validationErrors,
    });
  }
}

function renderOneElement(req, res, next, dataBasePromiseFunction) {
  const id = req.params.id;
  dataBasePromiseFunction(id).then((results) => {
    if (results.error) {
      rednerError(res, 400, "Błąd operacji w bazie danych!");
    } else {
      res.status(200).json({ status: "ok", results: results[0] });
    }

  }).catch(err => rednerError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}


function renderRemoveElement(req, res, next, dataBasePromiseFunction) {
  const id = req.params.id;
  dataBasePromiseFunction(id).then((results) => {
    if (results.error) {
      rednerError(res, 400, "Błąd operacji w bazie danych!");
    } else {
      res.status(201).json({ status: "ok", message: 'Usunięto element z bazy danych' });
    }

  }).catch(err => rednerError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}


function rednerError(res, status, msg) {
  res.status(status).json({
    status: "error",
    message: msg,
  });
}


module.exports = {
  renderAllElements,
  renderAddNewElement,
  renderUpdateElement,
  renderRemoveElement,
  renderOneElement
};
