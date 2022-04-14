const Salon = require("../models/salon");
const async = require("async");
const { findLocation } = require("../public/javascripts/findLocation");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// return all salons
exports.salon_explore_get = (req, res) => {
  async.parallel(
    {
      salons: function (callback) {
        Salon.find({}).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/");
      }
      res.render("salon_explore", { salons: results.salons });
    }
  );
};

// return specific salon
exports.salon_detail_get = (req, res, next) => {
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
      return res.render("salon_detail", { salon: results.salon });
    }
  );
};

// get salon creation form
exports.salon_create_get = (req, res, next) => {
  res.render("salon_form");
};

// create salon
exports.salon_create_post = [
  body("name").trim().escape(),
  body("type").trim().escape(),
  body("average_price").trim().escape(),
  body("image").trim(),
  body("street_address").trim().escape(),
  body("city").trim().escape(),
  body("state").trim().escape(),
  body("zip_code").trim().escape(),
  body("geometry").escape(),
  body("author").trim().escape(),
  body("reviews"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(errors.array());
    let salonGeometry = await findLocation(
      req.body.street_address,
      req.body.city,
      req.body.state,
      req.body.zip_code
    );
    let salon = new Salon({
      name: req.body.name,
      type: req.body.type,
      average_price: req.body.average_price,
      image: req.body.image,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      geometry: salonGeometry,
      author: req.body.author,
      reviews: req.body.reviews,
    });
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) return res.sendStatus(403);
      salon.save(function (err) {
        if (err) return next(err);
        return res.send("Salon created succesfully");
      });
    });
  },
];

// update salon
exports.salon_update_post = (req, res) => {};

// delete salon
exports.salon_delete_post = (req, res, next) => {
  async.parallel(
    {
      salon: function (callback) {
        Salon.findById(req.params.salonid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) return res.sendStatus(403);
        Salon.findByIdAndDelete(req.params.salonid, function () {
          if (err) return next(err);
          return res.send("Salon successfully deleted");
        });
      });
    }
  );
};
