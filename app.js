var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
const connectDB = require("./public/javascripts/CURD_connectionToDB"); // Import the connectDB function (or connection to DB )  for accessing

// Connect to MongoDB
connectDB();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var aboutRouter = require("./routes/about");
var CRUDoperationRouter = require("./routes/CRUD_insertionOfDataToDB"); // in here this path is saved into this CRUDoperationRouter variable. This is the important page contain all the routes

var app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the view engine to HBS (Handlebars)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Use helmet for security

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/about", aboutRouter);
app.use("/CRUD", CRUDoperationRouter); // in here when we type localhost:3000/CRUD in the search bar then it first move to this file CRUD_insertionOfDataToDB.

// Catch 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
