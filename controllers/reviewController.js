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
  async (req, res, next) => {
    async.parallel(
      {
        salon: function (callback) {
          Salon.findById(req.params.salonid).exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          req.flash("error", "Something went wrong");
          return res.redirect("/explore");
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          req.flash("error", "Something went wrong");
          return res.redirect(`/explore/detail/${results.salon._id}`);
        }
        let review = new Review({
          body: req.body.body,
          rating: req.body.rating,
          author: req.user._id,
        });
        review.save(function (err) {
          if (err) {
            req.flash("error", "Something went wrong");
            return res.redirect(`/explore/detail/${results.salon._id}`);
          }
          results.salon.reviews.push(review);
          results.salon.save();
          req.flash("success", "Review successfully posted");
          return res.redirect(`/explore/detail/${results.salon._id}`);
        });
      }
    );
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
      if (err) {
        req.flash("error", "Something went wrong");
        return res.redirect(`/explore/detail/${req.params.salonid}`);
      }
      Review.findByIdAndDelete(req.params.reviewid, async function () {
        if (err) {
          req.flash("error", "Something went wrong");
          return res.redirect(`/explore/detail/${req.params.salonid}`);
        }
        await Salon.findByIdAndUpdate(req.params.salonid, {
          $pull: { reviews: req.params.reviewid },
        });
        req.flash("success", "Review successfully deleted");
        return res.redirect(`/explore/detail/${req.params.salonid}`);
      });
    }
  );
};
