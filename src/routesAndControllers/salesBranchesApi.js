const express = require('express');
const {getAllBranches} = require('./../model/salesBranches');
const router = express.Router();

router.get('/sales-branches/all', renderAll);

router.post('/sales-branches/add-new', renderAddNew);

router.patch('/sales-branches/update', renderUpdate);

router.delete('/sales-branches/delete', renderRemove);


function renderAll(req,res,next) {
    getAllBranches().then(results => {
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