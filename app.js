const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');

const User = require('./models/user');
const Listing = require('./models/listing');
const Booking = require('./models/booking');
const Review = require('./models/review');
const { storeReturnTo } = require('./middleware');
const { isLoggedIn } = require('./middleware');

const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', userRoutes);
app.use('/listings', listingRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', isLoggedIn, async (req, res) => {
    const listingsCount = await Listing.countDocuments({ owner: req.user._id });
    const bookingsCount = await Booking.countDocuments({ user: req.user._id });
    const reviewsCount = await Review.countDocuments({ user: req.user._id });
    const recentBookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 })
        .limit(5);

    res.render('dashboard/index', { listingsCount, bookingsCount, reviewsCount, recentBookings });
});

app.all('*', (req, res, next) => {
    res.status(404).render('error', { error: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});
