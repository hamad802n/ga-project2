const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");


router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  if (!req.body.username || !req.body.username.trim() || !req.body.password) {
    return res.send("Username and password are required");
  }

  const username = req.body.username.trim();

  const userInDatabase = await User.findOne({ username: username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password.length <= 6) {
    return res.send("Password should be above 6 characters");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  
  await User.create({ username: username, password: hashedPassword });
  res.redirect("/auth/sign-in");
});



router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});



router.post("/sign-in", async (req, res) => {
  
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
    role: userInDatabase.role
  };

  res.redirect("/");
});


router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});





module.exports = router;
