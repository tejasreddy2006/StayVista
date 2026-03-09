require("dotenv").config();

<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const User = require("./models/user");
const Listing = require("./models/listing");
const Booking = require("./models/booking");
const Review = require("./models/review");

const { storeReturnTo, isLoggedIn } = require("./middleware");

const userRoutes = require("./routes/users");
const listingRoutes = require("./routes/listings");
const bookingRoutes = require("./routes/bookings");
const reviewRoutes = require("./routes/reviews");
const adminRoutes = require("./routes/admin");
=======
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
const { storeReturnTo, isLoggedIn } = require('./middleware');

const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff

const app = express();

/* ---------------- DATABASE ---------------- */

<<<<<<< HEAD
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
  });
=======
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!");
})
.catch(err=>{
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
});
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff

/* ---------------- APP CONFIG ---------------- */

app.set("trust proxy", 1);

<<<<<<< HEAD
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
=======
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff

/* ---------------- SESSION ---------------- */

const sessionConfig = {
<<<<<<< HEAD
  name: "stayvista-session",
  secret: process.env.SESSION_SECRET || "stayvista_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
=======
    name:"stayvista-session",
    secret:process.env.SESSION_SECRET || "stayvista_secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:false,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
};

app.use(session(sessionConfig));
app.use(flash());

/* ---------------- PASSPORT ---------------- */

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ---------------- GLOBAL VARIABLES ---------------- */

<<<<<<< HEAD
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
=======
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});

/* ---------------- ROUTES ---------------- */

<<<<<<< HEAD
app.use("/", userRoutes);
app.use("/listings", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/admin", adminRoutes);

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
  res.render("home");
=======
app.use('/',userRoutes);
app.use('/listings',listingRoutes);
app.use('/bookings',bookingRoutes);
app.use('/reviews',reviewRoutes);
app.use('/admin',adminRoutes);

/* ---------------- HOME ---------------- */

app.get('/',(req,res)=>{
    res.render('home');
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});

/* ---------------- DASHBOARD ---------------- */

<<<<<<< HEAD
app.get("/dashboard", isLoggedIn, async (req, res) => {
  try {
    const listingsCount = await Listing.countDocuments({ owner: req.user._id });
    const bookingsCount = await Booking.countDocuments({ user: req.user._id });
    const reviewsCount = await Review.countDocuments({ user: req.user._id });

    const result = await Booking.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, totalSpent: { $sum: "$totalPrice" } } },
=======
app.get('/dashboard',isLoggedIn,async(req,res)=>{

    const listingsCount = await Listing.countDocuments({owner:req.user._id});
    const bookingsCount = await Booking.countDocuments({user:req.user._id});
    const reviewsCount = await Review.countDocuments({user:req.user._id});

    const result = await Booking.aggregate([
        { $match:{user:req.user._id}},
        { $group:{ _id:null,totalSpent:{ $sum:"$totalPrice"}}}
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
    ]);

    const totalSpent = result.length > 0 ? result[0].totalSpent : 0;

<<<<<<< HEAD
    const recentBookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("dashboard/index", {
      listingsCount,
      bookingsCount,
      reviewsCount,
      recentBookings,
      totalSpent,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Could not load dashboard");
    res.redirect("/");
  }
=======
    const recentBookings = await Booking.find({user:req.user._id})
        .populate('listing')
        .sort({createdAt:-1})
        .limit(5);

    res.render("dashboard/index",{
        listingsCount,
        bookingsCount,
        reviewsCount,
        recentBookings,
        totalSpent
    });

>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});

/* ---------------- 404 ---------------- */

<<<<<<< HEAD
app.all("*", (req, res) => {
  res.status(404).render("error", { error: "Page Not Found" });
=======
app.all("*",(req,res)=>{
    res.status(404).render("error",{error:"Page Not Found"});
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});

/* ---------------- ERROR HANDLER ---------------- */

<<<<<<< HEAD
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
=======
app.use((err,req,res,next)=>{
    const {statusCode=500} = err;
    if(!err.message) err.message="Something went wrong";
    res.status(statusCode).render("error",{err});
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});

/* ---------------- SERVER ---------------- */

const port = process.env.PORT || 8080;

<<<<<<< HEAD
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
=======
app.listen(port,()=>{
    console.log(`Serving on port ${port}`);
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
});