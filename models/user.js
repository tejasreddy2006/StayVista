const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

/* ---------------- Register Form ---------------- */

router.get("/register", (req, res) => {
    res.render("users/register");
});

/* ---------------- Register User ---------------- */

<<<<<<< HEAD
router.post("/register", async (req, res, next) => {
=======
router.post("/register", async (req, res) => {
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username: username,
            email: email
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
<<<<<<< HEAD
            if (err) return next(err);

=======
            if (err) {
                return next(err);
            }
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
            req.flash("success", "Welcome to StayVista!");
            res.redirect("/listings");
        });

<<<<<<< HEAD
    } catch (err) {
        req.flash("error", err.message);
=======
    } catch (e) {
        req.flash("error", e.message);
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
        res.redirect("/register");
    }
});

/* ---------------- Login Form ---------------- */

router.get("/login", (req, res) => {
    res.render("users/login");
});

/* ---------------- Login User ---------------- */

<<<<<<< HEAD
router.post(
    "/login",
=======
router.post("/login",
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        req.flash("success", "Welcome back!");
        res.redirect("/listings");
    }
);

/* ---------------- Logout ---------------- */

router.get("/logout", (req, res, next) => {
<<<<<<< HEAD
    req.logout(function (err) {
        if (err) return next(err);

=======
    req.logout(function(err) {
        if (err) { return next(err); }
>>>>>>> e8883f70725b49ecb548feba77577f7b4a2dfdff
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;