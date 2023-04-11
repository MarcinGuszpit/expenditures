const {validationResult} = require("express-validator");
const {extractErrors} = require("../utils/utils");

function renderAllElements(req, res, next, dataBasePromiseFunction) {
    dataBasePromiseFunction()
        .then((results) => {
            if (results.error) {
                let msg = results.msg || "Błąd operacji w bazie danych!";
                renderError(res, 400, msg);
            } else {
                res.status(200).json({status: "ok", results});
            }
        })
        .catch(err => renderError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}

function renderAddNewElement(req, res, next, dataBasePromiseFunction) {
    const errors = validationResult(req).array();
    if (errors.length === 0) {
        dataBasePromiseFunction(req.body)
            .then((results) => {
                if (results.error) {
                    let msg = results.msg || "Błąd operacji w bazie danych!";
                    renderError(res, 400, msg);
                } else {
                    res.status(201).json({
                        status: "ok",
                        message: "Dodano element do tablicy bazy danych!",
                    });
                }
            })
            .catch(err => renderError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
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
        const {id} = req.body;
        dataBasePromiseFunction(id, {...req.body})
            .then((results) => {
                if (results.error) {
                    let msg = results.msg || "Błąd operacji w bazie danych!";
                    renderError(res, 400, msg);
                } else {
                    res.status(200).json({
                        status: "ok",
                        message: "Zmieniono wartość elementu w bazie danych!",
                    });
                }
            })
            .catch(err => renderError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
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
            renderError(res, 400, "Błąd operacji w bazie danych!");
        } else {
            res.status(200).json({status: "ok", results: results[0]});
        }

    }).catch(err => renderError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}


function renderRemoveElement(req, res, next, dataBasePromiseFunction) {
    const id = req.params.id;
    dataBasePromiseFunction(id).then((results) => {
        if (results.error) {
            let msg = results.msg || "Błąd operacji w bazie danych!";
            renderError(res, 400, msg);
        } else {
            res.status(201).json({status: "ok", message: 'Usunięto element z bazy danych'});
        }

    }).catch(err => renderError(res, 400, "Wystąpił nieokreślony błąd bazy danych!"));
}


function renderError(res, status, msg) {
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
