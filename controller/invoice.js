const {connection} = require('../connection');

const addInvoice = (invoice) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO invoice (invoice_no, date, amount, profit, status, supplier_id) VALUES (?,?,?,?,'CREATED',?)",
            [invoice.invoice_no, invoice.date, invoice.amount, invoice.profit, invoice.supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const updateInvoice = (invoice_id, invoice) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE invoice SET invoice_no=?, date=?, amount=?, profit=?, status=? WHERE invoice_id=?",
            [invoice.invoice_no, invoice.date, invoice.amount, invoice.profit, invoice.status, invoice_id],
            (err1, res) => {
                if (err1) {
                    reject(err1);
                } else {
                    resolve(res);
                }
            });
    })
}

const getInvoice = (invoice_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM invoice WHERE invoice_id=?",
            [invoice_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res[0]);
            });
    });
}

const getInvoices = (from, to, supplier_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM invoice WHERE (? <= date) and (date <= ?) and supplier_id=?",
            [from, to, supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
};

const getInvoiceDateRange = (supplier_id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT MAX(date) as toDate, MIN(date) as fromDate FROM invoice WHERE supplier_id=?",
            [supplier_id],
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res[0]);
            });
    });
};

module.exports = {
    addInvoice, getInvoices, getInvoiceDateRange, getInvoice, updateInvoice
}