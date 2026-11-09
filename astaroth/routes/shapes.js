const express = require('express')
const router = express.Router()
const shapesController = require('../controllers/shapes');
router.get('/adm1', shapesController.getamd1);

module.exports = router;
