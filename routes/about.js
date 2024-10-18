var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  /*   
  res.render("about", { fname: "Aslam youseph" });  this is used to pass a single value to the .hbs file
   */
  /*
  const names = ["Aslam", "Youseph", "Aseena", "Afnitha"]; used to sent an array of values
  res.render("about", { names });
  */
  /*
  in this way we can able to pass the object in the .hbs file
  const details = {
    name1: "Aslam",
    name2: "Youseph",
    age: { name1_age: "21", name2_age: "51" },
  };
  res.render("about", { details });
  */
  /* it is an example of if elseif 
  const details = {
    name1: "Aslam",
    admin: true,
  };
  res.render("about", { details });
  */
});

module.exports = router;
