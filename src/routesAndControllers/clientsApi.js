const express = require('express');
const {getAllClients} = require('./../model/clients');
const router = express.Router();

router.get('/clients/all', renderAll);

router.post('/clients/add-new', renderAddNew);

router.patch('/clients/update', renderUpdate);

router.delete('/clients/delete', renderRemove);



function renderAll(req,res,next) {
    getAllClients().then(results => {
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