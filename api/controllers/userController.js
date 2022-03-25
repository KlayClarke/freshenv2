const User = require("../models/user");
const async = require("async");
const { body, validationResult } = require("express-validator");

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
exports.user_delete = function (req, res) {};
