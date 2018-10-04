const express = require('express');
const router = express.Router();

const InvoiceController = require('../controller/invoice');


/**
 * POST
 * add new invoice
 */
router.post('/', (req, res) => {
    InvoiceController.addInvoice(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

/**
 * GET
 * get all invoices within time range (from and to), for given supplier_id
 */
router.get('/', (req, res) => {
    console.log(req.query);
    InvoiceController.getInvoices(req.query.from, req.query.to, req.query.supplier).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
});

module.exports = router;