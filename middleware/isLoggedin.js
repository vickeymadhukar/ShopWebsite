const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    // Fix: should be `req.cookies` (not `req.cookie`)
    if (!req.cookies || !req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification error:", err.message);
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};
