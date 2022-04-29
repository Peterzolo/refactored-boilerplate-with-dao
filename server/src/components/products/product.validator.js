const { check } = require("express-validator");
const { passwordPattern } = require("../../library/helpers/validationHelpers");

const message = {
  email: "Please enter a valid email",
  password: "Password must contain Upper case, lower case and numbers",
};

exports.validateSignUp = () => {
  return [
    check("email").isEmail().withMessage(message.email).trim().normalizeEmail(),
    check("password", message.password)
      .isLength({ min: 5 })
      .matches(passwordPattern)
      .trim(),
  ];
};

exports.validateLogin = () => {
  return [
    check("email").isEmail().withMessage(message.email).trim().normalizeEmail(),
    check("password", message.password)
      .isLength({ min: 5 })
      .matches(passwordPattern)
      .trim(),
  ];
};

exports.validateEdit = () => {
  return [
    check("firstName")
      .isLength({ min: 5, max: 20 })
      .trim()
      .withMessage(message.firstName),
    check("lastName")
      .isLength({ min: 5, max: 20 })
      .trim()
      .withMessage(message.firstName),
    check("email").isEmail().normalizeEmail().trim().withMessage(message.email),
  ];
};
