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

// // user join post
// exports.user_join_post = [
//   body("first_name").trim().isLength({ min: 1 }).escape(),
//   body("last_name").trim().isLength({ min: 1 }).escape(),
//   body("email").trim().isLength({ min: 1 }).escape(),
//   body("password").trim().isLength({ min: 1 }).escape(),
//   async (req, res, next) => {
//     const errors = validationResult(req);
//     let hashedPassword = await bcrypt.hash(req.body.password, 10);
//     let user = new User({
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     if (!errors.isEmpty()) return res.json(errors.array());
//     User.findOne({ email: req.body.email }).exec(function (err, found_user) {
//       if (err) return next(err);
//       if (found_user) return res.render("");
//       user.save(function (err) {
//         if (err) return next(err);
//         res.render("home");
//       });
//     });
//   },
// ];

// // user login post
// exports.user_login_post = [
//   body("email").trim().isLength({ min: 1 }).escape(),
//   body("password").trim().isLength({ min: 1 }).escape(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.json(errors.array());
//     User.findOne({ email: req.body.email }).exec(async function (
//       err,
//       found_user
//     ) {
//       if (err) return next(err);
//       if (!found_user) {
//         return res.json({ error: "User not found" });
//       }
//       // check if request body password matches db unhashed password
//       let result = await bcrypt.compare(req.body.password, found_user.password);
//       if (result) {
//         jwt.sign(
//           { email: found_user.email, password: found_user.password },
//           "secretkey",
//           (err, token) => {
//             if (err) return next(err);
//             res.json({ token, id: found_user._id });
//           }
//         );
//       } else {
//         return res.render("home");
//       }
//     });
//   },
// ];
