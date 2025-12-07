const footerEmailController = require('../controllers/footerController');
const express = require('express');
const router = express.Router();

// ---------------------------create footer email subscription
router.post('/subscribe', async (req, res) => {
    let result = await footerEmailController.create(req);
    return res.status(result.code).send(result);
});

module.exports = router;