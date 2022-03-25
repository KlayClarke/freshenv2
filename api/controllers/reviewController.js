const Salon = require("../models/salon");
const Review = require("../models/review");
const async = require("async");
const { body, validationResult } = require("express-validator");

// return all reviews
exports.review_list = function (req, res) {
  Review.find().exec(function (err, list_reviews) {
    if (err) return next(err);
    return res.json(list_reviews);
  });
};

// return specific review
exports.review_detail = function (req, res, next) {
  async.parallel(
    {
      review: function (callback) {
        Review.findById(req.params.reviewid).populate("author").exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.json(results.review);
    }
  );
};

// create review
exports.review_create = function (req, res) {};

// update review
exports.review_update = function (req, res) {};

// delete review
exports.review_delete = function (req, res) {};
