const express = require('express');
const router = express.Router();
const bookings = require('../controllers/bookings');
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, bookings.showBookings);
router.post('/listings/:id', isLoggedIn, bookings.createBooking);
router.post('/:id/pay', isLoggedIn, bookings.payBooking);
router.delete('/:id', isLoggedIn, bookings.deleteBooking);

module.exports = router;
