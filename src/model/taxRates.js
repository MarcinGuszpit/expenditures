const {
  getElement,
  getAllElements,
  changeElement,
  addElement,
  removeElement
} = require("./commonDbModel");

const TaxRateQuery = "SELECT * FROM TAX_RATES WHERE ID=?";
const AllTaxesQuery = "SELECT * FROM TAX_RATES";
const AddTaxRateQuery =
  "INSERT INTO `TAX_RATES`(`NAME`, `RATE`, `SELECTED`) VALUES (?,?,?)";
const UpdateTaxRateQuery =
  "UPDATE `TAX_RATES` SET `NAME`= ?,`RATE`= ?,`SELECTED`= ? WHERE ID = ?";

const RemoveElementQuery = 'DELETE FROM `TAX_RATES` WHERE ID=?';

function getTaxRate(id) {
  return getElement(id, TaxRateQuery);
}

function getAllTaxRates() {
  return getAllElements(AllTaxesQuery);
}

function changeTaxRate(id, taxRate) {
  const values = [taxRate.name, taxRate.rate, taxRate.selected || "0"];
  return changeElement(UpdateTaxRateQuery, id, values);
}

function addTaxRate(taxRate) {
  const values = [taxRate.name, taxRate.rate, taxRate.selected || "0"];
  return addElement(AddTaxRateQuery, values);
}

function removeTaxRate(id) {
  return removeElement(id, RemoveElementQuery);
}

module.exports = {
  getTaxRate,
  getAllTaxRates,
  addTaxRate,
  changeTaxRate,
  removeTaxRate
};
