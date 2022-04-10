const User = require("../models/user");
const async = require("async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult, sanitizeBody } = require("express-validator");

// user join get
exports.user_join_get = (req, res) => {
  res.render("user_join_form");
};

// user login get
exports.user_login_get = (req, res) => {
  res.render("user_login_form");
};

// user join post
exports.user_join_post = [
  body("email").trim().isLength({ min: 1 }).escape(),
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array());
      return res.redirect("/join");
    }
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    try {
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) {
          req.flash("error", err);
          res.redirect("/join");
        }
        req.flash("success", "Welcome to freshen");
        const redirectUrl = req.session.returnTo || "/";
        delete req.session.returnTo;
        return res.redirect(redirectUrl);
      });
    } catch (err) {
      async.parallel(
        {
          user_with_same_email: function (callback) {
            User.find({ email: req.body.email }).exec(callback);
          },
          user_with_same_username: function (callback) {
            User.find({ username: req.body.username }).exec(callback);
          },
        },
        function (err, results) {
          if (err) return next(err);
          if (results.user_with_same_email.length) {
            req.flash(
              "error",
              "An account with the same email address is already registered"
            );
            return res.redirect("/join");
          }
          if (results.user_with_same_username.length) {
            req.flash(
              "error",
              "An account with the same username is already registered"
            );
            return res.redirect("/join");
          }
        }
      );
    }
  },
];

// user login post
exports.user_login_post = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array());
      res.redirect("/login");
    }
    req.flash("success", `Welcome back, ${req.body.username}`);
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  },
];

exports.user_logout_post = (req, res, next) => {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
};

// user account get
exports.user_account_get = (req, res, next) => {
  res.render("user_account");
};

// user account delete post
exports.user_account_delete_post = (req, res, next) => {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.user._id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        console.log("akjsdjksdl");
        req.flash("error", "Something went wrong! Please try again.");
        return res.redirect("/account");
      }
      if (results.user) {
        User.findByIdAndDelete(req.user._id, function deleteUser(err) {
          if (err) return next(err);
          req.flash("success", "Your account has been deleted");
          res.redirect("/");
        });
      }
    }
  );
};
