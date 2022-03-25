const Salon = require("../models/salon");
const async = require("async");
const { body, validationResult } = require("express-validator");

// return all salons
exports.salon_list = function (req, res) {
  Salon.find().exec(function (err, list_salons) {
    if (err) return next(err);
    return res.json(list_salons);
  });
};

// return specific salon
exports.salon_detail = function (req, res, next) {
  async.parallel(
    {
      salon: function (callback) {
        Salon.findById(req.params.salonid)
          .populate("author")
          .populate("reviews")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.json(results.salon);
    }
  );
};

// create salon
exports.salon_create = function (req, res) {};

// update salon
exports.salon_update = function (req, res) {};

// delete salon
exports.salon_delete = function (req, res) {};
