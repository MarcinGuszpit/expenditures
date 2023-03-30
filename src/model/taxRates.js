const { getElement, getAllElements, changeElement, addElement } = require("./commonDbModel");

const TaxRateQuery = 'SELECT * FROM TAX_RATES WHERE ID=?';
const AllTaxesQuery = 'SELECT * FROM TAX_RATES';
const AddTaxRateQuery = 'INSERT INTO `TAX_RATES`(`NAME`, `RATE`, `SELECTED`) VALUES (?,?,?)';
const UpdateTaxRateQuery = 'UPDATE `TAX_RATES` SET `NAME`= ?,`RATE`= ?,`SELECTED`= ? WHERE ID = ?';

function getTaxRate(id) {
    return getElement(id,TaxRateQuery);
}

function getAllTaxRates() {
    return getAllElements(AllTaxesQuery);
}

function changeTaxRate(id, taxRate) {
    const values = [taxRate.name, taxRate.rate, taxRate.selected];
    return changeElement(UpdateTaxRateQuery,id,values);
}

function addTaxRate(taxRate) {
    const values = [taxRate.name, taxRate.rate, taxRate.selected];
    return addElement(AddTaxRateQuery,values);
}


module.exports = {
    getTaxRate,
    getAllTaxRates,
    addTaxRate,
    changeTaxRate
}
