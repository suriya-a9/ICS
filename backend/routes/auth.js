const express = require("express");
const router = express.Router();
const { register, login, changePassword } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validators");

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/forgot-password", changePassword);

module.exports = router;