const contactController = require('../controllers/contactController');
const express = require('express');
const router = express.Router();

// -----------------------create

router.post('/create',async (req,res)=>{
    let result = await contactController.create(req);
    return res.status(result.code).send(result);
})

// -----------------------get

router.get('/get',async (req,res)=>{
    let result = await contactController.get(req);
    return res.status(result.code).send(result);
})

module.exports = router;