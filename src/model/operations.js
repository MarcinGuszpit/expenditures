const {
  getElement,
  getAllElements,
  changeElement,
  addElement,
} = require("./commonDbModel");

const OperationQuery = "SELECT * FROM Operations WHERE ID=?";
const AllOperationsQuery = "SELECT * FROM `Operations`";
const AddOperationQuery =
  "INSERT INTO `OPERATIONS`(`NAME`, `OPERATION`) VALUES (?,?)";
const UpdateOperationQuery =
  "UPDATE `Operations` SET `name`=?,`operation`=? WHERE ID=?";
const DeleteQuery = "DELETE FROM `Operations` WHERE ID=?";

function getOperation(id) {
  return getElement(id, OperationQuery);
}

function getAllOperations() {
  return getAllElements(AllOperationsQuery);
}

function changeOperation(id, operation) {
  const values = [operation.name, operation.operation];
  return changeElement(UpdateOperationQuery, id, values);
}

function addOperation(operation) {
  const values = [operation.name, operation.operation];
  return addElement(AddOperationQuery, values);
}

function removeBranch(id) {
  return removeElement(id, DeleteQuery);
}

module.exports = {
  getOperation,
  getAllOperations,
  addOperation,
  changeOperation,
};
