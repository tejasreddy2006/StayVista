const express = require('express');
const router = express.Router();
const listings = require('../controllers/listings');
const { isLoggedIn, isOwner } = require('../middleware');

router.get('/', listings.index);

router.get('/new', isLoggedIn, listings.renderNewForm);

router.post('/', isLoggedIn, listings.createListing);

router.get('/:id', listings.showListing);

router.get('/:id/edit', isLoggedIn, isOwner, listings.renderEditForm);

router.put('/:id', isLoggedIn, isOwner, listings.updateListing);

router.delete('/:id', isLoggedIn, isOwner, listings.deleteListing);

module.exports = router;
