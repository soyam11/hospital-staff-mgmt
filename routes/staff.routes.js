const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const verifyPermissions = require('../middleware/verifyPermissions');

router.post('/', verifyPermissions('create'), staffController.createStaff);
router.get('/search', verifyPermissions('read'), staffController.searchStaff);
router.get('/:id', verifyPermissions('read'), staffController.readStaff);
router.put('/:id', verifyPermissions('update'), staffController.updateStaff);
router.delete('/:id', verifyPermissions('delete'), staffController.deleteStaff);

module.exports = router;
