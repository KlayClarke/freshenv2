require("dotenv").config();
require("./mongoConfig");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/userRoutes");
var salonsRouter = require("./routes/salonRoutes");
var reviewsRouter = require("./routes/reviewRoutes");

var app = express();

// configure session
var sessionConfig = {
  secret: "session-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 604800000,
    maxAge: 604800000,
  },
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); // store user in session
passport.deserializeUser(User.deserializeUser()); // remove user from session

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/salons", salonsRouter);
app.use("/reviews", reviewsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
