const User = require("../models/user");
const async = require("async");
const bcrypt = require("bcryptjs");
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
exports.user_create = function (req, res) {};

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
      if (!(req.body.api_key || req.body.api_key != process.env.API_KEY))
        return res.send("Unauthorized delete request unsuccessful");
      User.findByIdAndDelete(req.params.userid, function deleteUser(err) {
        if (err) return next(err);
        return res.send("User successfully deleted");
      });
    }
  );
};
