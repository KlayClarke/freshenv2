const async = require("async");
const Salon = require("../models/salon");
const { findLocation } = require("../public/javascripts/findLocation");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.get_salon_list = (req, res) => {
  async.parallel(
    {
      salons: function (callback) {
        Salon.find({}).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.json({ features: results.salons });
    }
  );
};

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
        req.flash("error", "Something went wrong");
        res.redirect("/");
      }
      if (req.params.sortby == "sort_by_name") {
        results.salons.sort(function (a, b) {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
      } else if (req.params.sortby == "sort_by_type") {
        results.salons.sort(function (a, b) {
          let typeA = a.type.toUpperCase();
          let typeB = b.type.toUpperCase();
          return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
        });
      } else if (req.params.sortby == "sort_by_average_price") {
        results.salons.sort(function (a, b) {
          let averagePriceA = parseInt(a.average_price);
          let averagePriceB = parseInt(b.average_price);
          return averagePriceA < averagePriceB
            ? -1
            : averagePriceA > averagePriceB
            ? 1
            : 0;
        });
      }
      res.render("salon_explore", {
        salons: results.salons,
        sort_by: req.params.sortby,
      });
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
          .populate({
            path: "reviews",
            model: "Review",
            select: "author body rating",
            populate: {
              path: "author",
              model: "User",
            },
          })
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.render("salon_detail", {
        salon: results.salon,
      });
    }
  );
};

// get salon creation form
exports.salon_create_get = (req, res, next) => {
  return res.render("salon_form", {
    task: "create",
  });
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
    if (!errors.isEmpty()) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
    if (req.body.name.includes("&") || req.body.street_address.includes("&")) {
      req.flash(
        "error",
        "Please use 'and' in place of '&' and Please refrain from using apostrophes ( ' )"
      );
      return res.redirect("back");
    }
    try {
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
        author: req.user._id,
        reviews: [],
      });
      salon.save(function (err) {
        if (err) {
          req.flash("error", "Something went wrong");
          return res.redirect("back");
        }
        req.flash("success", "Creation successful");
        return res.redirect(`/explore/detail/${salon._id}`);
      });
    } catch (err) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
  },
];

// get salon update form
exports.salon_update_get = (req, res) => {
  async.parallel(
    {
      salon: function (callback) {
        Salon.findById(req.params.salonid).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("back");
      }
      return res.render("salon_form", { salon: results.salon, task: "update" });
    }
  );
};

// handle salon update
exports.salon_update_post = [
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
    if (!errors.isEmpty()) {
      req.flash("error", "Something went wrong");
      return res.redirect("/");
    }
    if (req.body.name.includes("&") || req.body.street_address.includes("&")) {
      req.flash(
        "error",
        "Please use 'and' in place of '&' and Please refrain from using apostrophes ( ' )"
      );
      return res.redirect("back");
    }
    try {
      let salonGeometry = await findLocation(
        req.body.street_address,
        req.body.city,
        req.body.state,
        req.body.zip_code
      );
      let salon = new Salon({
        _id: req.params.salonid,
        name: req.body.name,
        type: req.body.type,
        average_price: req.body.average_price,
        image: req.body.image,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        geometry: salonGeometry,
        author: req.user._id,
        reviews: [],
      });
      Salon.findByIdAndUpdate(salon._id, salon, {}, function (err, thesalon) {
        if (err) {
          req.flash("error", "Something went wrong");
          return res.redirect("back");
        }
        req.flash("success", "Update successful");
        return res.redirect(`/explore/detail/${salon._id}`);
      });
    } catch (err) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
  },
];

// get salon delete confirm page
exports.salon_delete_get = (req, res, next) => {
  async.parallel(
    {
      salon: function (callback) {
        Salon.findById(req.params.salonid).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        req.flash("error", "Something went wrong");
        res.redirect("back");
      }
      res.render("salon_delete_confirm", { salon: results.salon });
    }
  );
};

// handle salon delete
exports.salon_delete_post = (req, res, next) => {
  async.parallel(
    {
      salon: function (callback) {
        Salon.findById(req.params.salonid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      Salon.findByIdAndDelete(results.salon._id, function () {
        if (err) {
          req.flash("error", "Something went wrong");
          res.redirect("back");
        }
        req.flash("success", "Deletion successful");
        return res.redirect("/explore/sort_by_name");
      });
    }
  );
};
