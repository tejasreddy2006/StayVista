const User = require('../models/user');
const Listing = require('../models/listing');
const Booking = require('../models/booking');

module.exports.dashboard = async (req, res) => {
    const usersCount = await User.countDocuments();
    const listings = await Listing.countDocuments();
    const bookings = await Booking.find({}).populate('user listing').sort({ createdAt: -1 });
    const recentListings = await Listing.find({}).populate('owner').sort({ createdAt: -1 }).limit(5);

    // Fetch users with their booking totals
    const usersList = await User.find({}).sort({ createdAt: -1 }).lean();
    const usersWithBookings = await Promise.all(usersList.map(async (user) => {
        const totalBookings = await Booking.countDocuments({ user: user._id });
        return { ...user, totalBookings };
    }));

    res.render('admin/dashboard', {
        stats: { users: usersCount, listings },
        bookings,
        recentListings,
        users: usersWithBookings
    });
};

module.exports.manageListings = async (req, res) => {
    const listings = await Listing.find({}).populate('owner').sort({ createdAt: -1 });
    res.render('admin/listings', { listings });
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/admin/listings');
};

module.exports.manageUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();

    // Fetch total bookings for each user
    const usersWithBookings = await Promise.all(users.map(async (user) => {
        const totalBookings = await Booking.countDocuments({ user: user._id });
        return { ...user, totalBookings };
    }));

    res.render('admin/users', { users: usersWithBookings });
};
