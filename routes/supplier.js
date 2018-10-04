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
        if (result.length) {
            res.status(200).send(result);
        } else {
            res.status(404).send(result);
        }
    }).catch((err) => {
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