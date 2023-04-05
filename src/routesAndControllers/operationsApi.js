const express = require("express");
const {
  getAllOperations,
  addOperation,
  changeOperation,
  removeOperation,
  getOperation,

} = require("./../model/operations");
const { check, validationResult } = require("express-validator");
const { renderAllElements, renderRemoveElement, renderOneElement, renderUpdateElement } = require("./commonApi");
const router = express.Router();

router.get("/operations/all", renderAll);

router.post(
  "/operations/add-new",
  [
    check("name")
      .notEmpty()
      .withMessage("Nazwa nie może być pusta")
      .isLength({ max: 25 })
      .withMessage("Nazwa nie może być dłuższa niż 25 znaków!"),
    check("operation")
      .isIn(["-1", "1"])
      .withMessage(
        "Operacja może przybierać tylko jedną z dwóch wartości [-1, 1]!"
      ),
  ],
  renderAddNew
);

router.patch(
  "/operations/update",
  [
    check("name")
      .notEmpty()
      .withMessage("Nazwa nie może być pusta")
      .isLength({ max: 25 })
      .withMessage("Nazwa nie może być dłuższa niż 25 znaków!"),
    check("operation")
      .isIn(["-1", "1"])
      .withMessage(
        "Operacja może przybierać tylko jedną z dwóch wartości [-1, 1]!"
      ),
  ],
  renderUpdate
);

router.get('/operations/elem/:id',renderOne)

router.delete("operations/delete/:id",renderRemove);

function renderAll(req, res, next) {
  renderAllElements(req, res, next, getAllOperations);
}

function renderAddNew(req, res, next) {
  renderAddNewElement(req, res, next, addOperation);
}

function renderUpdate(req, res, next) {
  renderUpdateElement(req, res, next, changeOperation);
}

function renderRemove(req, res, next) {
  renderRemoveElement(req,res,next,removeOperation);
}

function renderOne(req,res,next) {
  renderOneElement(req,res,next,getOperation);
}



module.exports = router;
