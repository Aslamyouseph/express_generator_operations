const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Define student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s/g, "")),
      message: "Name must contain only alphabets and spaces",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student; // this is exporting to the CRUD_insertionOfDataTODb.js
