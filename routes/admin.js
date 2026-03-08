const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const { isAdmin } = require('../middleware');

router.get('/dashboard', isAdmin, admin.dashboard);

router.get('/listings', isAdmin, admin.manageListings);

router.delete('/listings/:id', isAdmin, admin.deleteListing);

router.get('/users', isAdmin, admin.manageUsers);

module.exports = router;
