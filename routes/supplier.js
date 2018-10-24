const express = require('express');
const router = express.Router();

const SupplierController = require('../controller/supplier');
const InvoiceController = require('../controller/invoice');

router.get('/', (req, res) => {
    SupplierController.getSuppliers().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/:supplier_id', (req, res) => {
    SupplierController.getSupplier(req.params["supplier_id"]).then((result) => {
        if (result.length) {
            res.status(200).send(result);
        } else {
            res.status(404).send(result);
        }
    }).catch((err) => {
        res.status(400).send(err);
    });
});

/**
 * GET
 * get all invoices within time range (from and to), for given supplier_id
 */
router.get('/:supplier_id/invoice', (req, res) => {
    InvoiceController.getInvoices(req.query.from, req.query.to, req.params.supplier_id).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
});

/**
 * GET
 * get min, max invoice dates, for given supplier_id
 */
router.get('/:supplier_id/invoice/dates', (req, res) => {
    InvoiceController.getInvoiceDateRange(req.params.supplier_id).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
    SupplierController.addSupplier(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

router.put('/:supplier_id', (req, res) => {
    SupplierController.updateSupplier(req.params["supplier_id"], req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

module.exports = router;