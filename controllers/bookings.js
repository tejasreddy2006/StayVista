const Booking = require('../models/booking');
const Listing = require('../models/listing');

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    console.log('Booking request for listing ID:', id); // Debug log
    const listing = await Listing.findById(id);

    if (!listing) {
        console.log('Listing not found for ID:', id); // Debug log
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    const { checkInDate, checkOutDate } = req.body;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const booking = new Booking({
        user: req.user._id,
        listing: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalPrice
    });

    await booking.save();
    req.flash('success', 'Booking created successfully!');
    res.redirect('/dashboard');
};

module.exports.showBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });
    res.render('bookings/index', { bookings });
};

module.exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
        req.flash('error', 'Booking not found!');
        return res.redirect('/dashboard');
    }

    if (!booking.user.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to cancel this booking.');
        return res.redirect('/dashboard');
    }

    await Booking.findByIdAndDelete(id);
    req.flash('success', 'Successfully cancelled the booking!');
    const redirectTo = req.headers.referer || '/dashboard';
    res.redirect(redirectTo);
};
