const { getElement, getAllElements, changeElement, addElement } = require("./commonDbModel");

const ElementQuery = "SELECT * FROM `TURNOVER` WHERE ID=?";
const AllElementsQuery = "SELECT * FROM `TURNOVER`";
const AddElementQuery =
  "INSERT INTO `TURNOVER`(`date`, `netto`, `vat`, `id_tax_rate`, `id_client`, `doc_number`, `id_operation`, `id_sale_branch`) VALUES (?,?,?,?,?,?,?)";
const UpdateElementQuery =
  "UPDATE `TURNOVER` SET `date`=?,`netto`=?,`vat`=?,`id_tax_rate`=?,`id_client`=?,`doc_number`=?,`id_operation`=?,`id_sale_branch`=? WHERE ID = ?";
const RemoveElementQuery = 'DELETE FROM `TURNOVER` WHERE ID=?';


