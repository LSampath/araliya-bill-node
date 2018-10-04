const {connection} = require('../connection');

const addInvoice = (invoice) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO invoice (invoice_no, date, amount, profit, status, supplier_id) VALUES (?,?,?,?,?,?)",
            [invoice.invoice_no, invoice.date, invoice.amount, invoice.profit, invoice.status, invoice.supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const getInvoices = (from, to, supplier_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM invoice WHERE (? < date) and (date < ?) and supplier_id=?",
            [from, to, supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

module.exports = {
    addInvoice, getInvoices
}