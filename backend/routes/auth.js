// backend/routes/auth.js

const express = require("express");
const { add, get } = require("../data/user");
const { isValidEmail, isValidText } = require("../util/validation");
const { NotFoundError } = require("../util/errors");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        // User doesn't exist, which is expected.
      } else {
        return next(error);
      }
    }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    res.status(201).json({ message: "User created.", user: createdUser });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  if (password !== user.password) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  res.json({ id: user.id, email: user.email, name: user.name });
});

module.exports = router;
