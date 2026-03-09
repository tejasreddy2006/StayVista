const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const { isLoggedIn } = require('../middleware');

router.post('/listings/:id', isLoggedIn, reviews.createReview);

router.delete('/listings/:id/:reviewId', isLoggedIn, reviews.deleteReview);

module.exports = router;
