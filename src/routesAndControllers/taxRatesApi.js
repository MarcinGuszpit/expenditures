const express = require('express');
const { getAllTaxRates } = require('../model/taxRates');
const router = express.Router();


router.get('/tax-rates/all', renderAll);

router.post('/tax-rates/add-new', renderAddNew);

router.patch('/tax-rates/update', renderUpdate);

router.delete('/tax-rates/delete',renderRemove);


function renderAll(req, res, next) {
    getAllTaxRates().then(results => {
        res.status(200).json(results);
    }).catch((err) => {
        res.status(400).json(err);
    });
};

function renderAddNew(req, res, next) {
    console.log(req.body);
    res.status(200).json({ message: 'ok' });
}

function renderUpdate(req,res,next) {
    console.log(req.body);
    res.status(200).json({ message: 'ok' });
}

function renderRemove(req,res,next) {
    console.log(req.body);
    res.status(200).json({ message: 'ok' });
}

module.exports = router;