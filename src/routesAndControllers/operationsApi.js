const express = require('express');
const {getAllOperations} = require('./../model/operations');
const router = express.Router();

router.get('/operations/all', renderAll);

router.post('operations/add-new', renderAddNew);

router.patch('operations/update', renderUpdate);

router.delete('operations/delete', renderRemove);


function renderAll(req,res,next) {
    getAllOperations().then(results => {
        res.status(200).json(results);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

function renderAddNew(req,res,next) {
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