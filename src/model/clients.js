const { getElement, getAllElements, changeElement, addElement, removeElement } = require("./commonDbModel");

const ClientQuery = 'SELECT * FROM `Clients` WHERE ID=?';
const AllClientsQuery = 'SELECT * FROM `Clients`';
const AddClientQuery = 'INSERT INTO `Clients`(`Short_name`, `name1`, `name2`, `PostalCode`, `CITY`, `STREET`, `NR_VAT`, `NR_REGON`) VALUES (?,?,?,?,?,?,?,?)';
const UpdateClientQuery = 'UPDATE `Clients` SET `Short_name`=?,`name1`=?,`name2`=?,`PostalCode`=?,`CITY`=?,`STREET`=?,`NR_VAT`=?,`NR_REGON`=? WHERE ID=?';
const DeleteQuery = "DELETE FROM `Clients` WHERE ID=?";

// client = `id`, `short_name`, `name1`, `name2`, `postal_code`, `city`, `street`, `nr_vat`, `nr_regon`


function getClient(id) {
    return getElement(id, ClientQuery);
}

function getAllClients() {
    return getAllElements(AllClientsQuery);
}

function changeClient(id, client) {
    const values = [client.shortName, client.name,client.nameCont,client.postalCode,client.city,client.street,client.vat,client.regon];
    return changeElement(UpdateClientQuery, id, values);
}

function addClient(client) {
    const values = [client.shortName, client.name,client.nameCont,client.postalCode,client.city,client.street,client.vat,client.regon];
    return addElement(AddClientQuery, values);
}

function removeClient(id) {
    return removeElement(id, DeleteQuery);
  }

module.exports = {
    getClient,
    getAllClients,
    addClient,
    changeClient,
    removeClient
}