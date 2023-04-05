const {
  getElement,
  getAllElements,
  changeElement,
  addElement,
  removeElement,
} = require("./commonDbModel");

const AddBranchQuery = "INSERT INTO `SALES_BRANCHES`(`NAME`) VALUES (?)";
const BranchQuery = "SELECT * FROM `SALES_BRANCHES` WHERE ID=?";
const AllBranchesQuery = "SELECT * FROM `SALES_BRANCHES`";
const UpdateBranchQuery = "UPDATE `SALES_BRANCHES` SET `NAME`=? WHERE ID = ?";
const DeleteQuery = "DELETE FROM `SALES_BRANCHES` WHERE ID=?";

function getBranch(id) {
  return getElement(id, BranchQuery);
}

function getAllBranches() {
  return getAllElements(AllBranchesQuery);
}

function changeBranch(id, branch) {
  const values = [branch.name];
  return changeElement(UpdateBranchQuery, id, values);
}

function addBranch(branch) {
  const values = [branch.name];
  return addElement(AddBranchQuery, values);
}

function removeBranch(id) {
  return removeElement(id, DeleteQuery);
}

module.exports = {
  getBranch,
  getAllBranches,
  addBranch,
  changeBranch,
  removeBranch,
};
