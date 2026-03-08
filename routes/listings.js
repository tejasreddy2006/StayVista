const express = require('express');
const router = express.Router();
const listings = require('../controllers/listings');
const { isLoggedIn, isAdmin } = require('../middleware');

router.get('/', listings.index);

router.get('/new', isLoggedIn, isAdmin, listings.renderNewForm);

router.post('/', isLoggedIn, isAdmin, listings.createListing);

router.get('/:id', listings.showListing);

router.get('/:id/edit', isLoggedIn, isAdmin, listings.renderEditForm);

router.put('/:id', isLoggedIn, isAdmin, listings.updateListing);

router.delete('/:id', isLoggedIn, isAdmin, listings.deleteListing);

module.exports = router;
