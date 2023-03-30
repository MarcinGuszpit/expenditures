const { connectionPool } = require("../utils/database")

function getElement(id, query) {
    return connectionPool.execute(query, [id]).then((results) => {
        return results[0];
    }).catch(err => {
        return {
            msg: 'Nie można połączyć się z bazą danych',
            error: err
        };
    });
}

function getAllElements(query) {
    return connectionPool.execute(query).then((results) => {
        return results[0];
    }).catch(err => {
        return {
            msg: 'Nie można połączyć się z bazą danych',
            error: err
        };
    });
}

function changeElement(query, id, values) {
    return connectionPool.execute(query, [...values, id]).then((results) => {
        return results[0];
    }).catch((err => {
        return {
            msg: 'Nie można połączyć się z bazą danych',
            error: err
        };
    }));
}

function addElement(query, values) {
    return connectionPool.execute(query, [...values]).then((results) => {
        return results[0];
    }).catch((err => {
        return {
            msg: 'Nie można połączyć się z bazą danych',
            error: err
        };
    }));
}

module.exports = {
    getElement,
    getAllElements,
    addElement,
    changeElement
}
