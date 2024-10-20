/**
 * All the project contain only one database . and it contain many table/collection and each table contain many documents
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB; // Export the connectDB function (or connection to DB )  for accessing
/**
 * In here when we call the connectDB function then only it will connect to the database.
 * This connectDB function is calling on CRUD_insertionOfDataToDB.js file . so we want to run this file
 * then only the connection code will start its execution
 */
