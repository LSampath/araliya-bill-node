const express = require('express');
const router = express.Router();

const SupplierController = require('../controller/supplier');

router.get('/', (req, res) => {
    SupplierController.getSuppliers().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/:supplier_id', (req, res) => {
    SupplierController.getSupplier(req.params["supplier_id"]).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports = router;