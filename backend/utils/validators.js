const { body } = require("express-validator");

const registerValidator = [
    body("firstName").notEmpty().withMessage("First name required"),
    body("lastName").notEmpty().withMessage("Last name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 chars")
];

const loginValidator = [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
];

module.exports = { registerValidator, loginValidator };