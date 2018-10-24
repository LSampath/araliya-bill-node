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

router.put('/:invoice_id', (req, res) => {
    InvoiceController.updateInvoice(req.params["invoice_id"], req.body).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/:invoice_id', (req, res) => {
    InvoiceController.getInvoice(req.params.invoice_id).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports = router;