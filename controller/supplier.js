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
                if (res.length == 1) {
                    resolve(res);
                } else {
                    reject({result: 'No such invoice'});
                }
            });
    });
}

const addSupplier = (supplier) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO supplier (name, email, contact, fax, address) VALUES (?,?,?,?,?)",
            [supplier.name, supplier.email, supplier.contact, supplier.fax, supplier.address],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

const updateSupplier = (supplier_id, supplier) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE supplier SET name=?, email=?, contact=?, fax=?, address=? WHERE supplier_id=?",
            [supplier.name, supplier.email, supplier.contact, supplier.fax, supplier.address, supplier_id],
            (err1, res) => {
                if (err1) {
                    reject(err1);
                } else {
                    resolve(res);
                }
            });
    })
}

module.exports = {
    getSuppliers, getSupplier, addSupplier, updateSupplier
}