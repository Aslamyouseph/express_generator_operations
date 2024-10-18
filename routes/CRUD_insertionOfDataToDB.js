const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const Student = require("../models/student"); // Mongoose student model where importing

// Render form to create or update student
//in here the control from /CRUD where came . so during this time it check the control is equal to /CRUD/ if it is equal then 10 line will execute.
// localhost:3000/CRUD/  => the second / is mentioned in the 10 line. if any route is present after the second / then it move to the next route .eg :localhost:3000/CRUD/CRUD_display
router.get("/", (req, res) => {
  res.render("CRUD_form", { title: "Create Student" });
});

// Render display page to show all students
router.get("/CRUD_display", async (req, res) => {
  try {
    const students = await Student.find().lean(); // Get all students details from the database
    res.render("CRUD_display", { students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("Error fetching data");
  }
});

// Render form for updating a specific student
router.get("/CRUD_form/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean(); // accessing the entire details of the particular student
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.render("CRUD_form", { student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).send("Error fetching data");
  }
});

// Delete student by ID
router.get("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/CRUD/CRUD_display");
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Error deleting data");
  }
});

// Handle form submission for creating or updating student
router.post("/signupSubmit", async (req, res) => {
  try {
    //accessing all the form data's to variable
    const { id, name, email, password } = req.body;

    // Validation checks
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      throw new Error("Name must be between 3 and 20 characters");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough"); // use this password G9!pV7$rQn2kS%f
    }

    if (id) {
      // Update existing student
      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        return res.status(404).send("Student not found");
      }

      existingStudent.name = name;
      existingStudent.email = email;
      if (password) {
        existingStudent.password = await bcrypt.hash(password, 10);
      }

      await existingStudent.save();
      res.status(200).redirect("/CRUD/CRUD_display");
    } else {
      // Create new student information
      const newStudent = new Student({ name, email, password });
      await newStudent.save();
      res.status(201).redirect("/CRUD/CRUD_display");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving data.");
  }
});

module.exports = router;
