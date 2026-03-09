const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

/* ---------------- Register Form ---------------- */

router.get("/register", (req, res) => {
    res.render("users/register");
});

/* ---------------- Register User ---------------- */

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username: username,
            email: email
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to StayVista!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
});

/* ---------------- Login Form ---------------- */

router.get("/login", (req, res) => {
    res.render("users/login");
});

/* ---------------- Login User ---------------- */

router.post("/login",
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
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;