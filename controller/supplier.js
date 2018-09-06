const {connection} = require('../connection');
const config = require('../config');

const getSuppliers = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM supplier",
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

const getSupplier = (supplier_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM supplier WHERE supplier_id=?",
            [supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

module.exports = {
    getSuppliers, getSupplier
}