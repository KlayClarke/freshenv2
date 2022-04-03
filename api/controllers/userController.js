const User = require("../models/user");
const async = require("async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult, sanitizeBody } = require("express-validator");

// return all users
exports.user_list = function (req, res) {
  User.find().exec(function (err, list_users) {
    if (err) return next(err);
    return res.json(list_users);
  });
};

// return specific user
exports.user_detail = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.userid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.json(results.user);
    }
  );
};

// user create
exports.user_create = [
  body("first_name").trim().isLength({ min: 1 }).escape(),
  body("last_name").trim().isLength({ min: 1 }).escape(),
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    if (!errors.isEmpty()) return res.json(errors.array());
    User.findOne({ email: req.body.email }).exec(function (err, found_user) {
      if (err) return next(err);
      if (found_user)
        return res.json({
          error: "User with same email found in database",
        });
      user.save(function (err) {
        if (err) return next(err);
        res.json({ success: "User successfully created" });
      });
    });
  },
];

// user update
exports.user_update = function (req, res) {};

// user delete
exports.user_delete = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.userid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (!(req.body.api_key || req.body.api_key == process.env.API_KEY))
        return res.send("Unauthorized delete request unsuccessful");
      User.findByIdAndDelete(req.params.userid, function deleteUser(err) {
        if (err) return next(err);
        return res.send("User successfully deleted");
      });
    }
  );
};

// user login
exports.user_login = [
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());
    User.findOne({ email: req.body.email }).exec(async function (
      err,
      found_user
    ) {
      if (err) return next(err);
      if (!found_user) {
        return res.json({ error: "User not found" });
      }
      // check if request body password matches db unhashed password
      let result = await bcrypt.compare(req.body.password, found_user.password);
      if (result) {
        jwt.sign(
          { email: found_user.email, password: found_user.password },
          "secretkey",
          (err, token) => {
            if (err) return next(err);
            res.json({ token, id: found_user._id });
          }
        );
      } else {
        return res.json("User credentials incorrect");
      }
    });
  },
];
