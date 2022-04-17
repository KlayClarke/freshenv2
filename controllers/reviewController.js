const Salon = require("../models/salon");
const Review = require("../models/review");
const async = require("async");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
exports.review_create = [
  body("body").trim().isLength({ min: 1 }).escape(),
  body("rating").trim().escape(),
  body("author").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    let review = new Review({
      body: req.body.body,
      rating: req.body.rating,
      author: req.body.author,
    });
    if (!errors.isEmpty()) return res.send(errors.array());
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) return res.sendStatus(403);
      review.save(function (err) {
        if (err) return next(err);
        return res.send("Review successfully created");
      });
    });
  },
];

// update review
exports.review_update = function (req, res) {};

// delete review
exports.review_delete = function (req, res) {
  async.parallel(
    {
      review: function (callback) {
        Review.findById(req.params.reviewid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) return res.sendStatus(403);
        Review.findByIdAndDelete(req.params.reviewid, function () {
          if (err) return next(err);
          return res.send("Review successfully deleted.");
        });
      });
    }
  );
};
