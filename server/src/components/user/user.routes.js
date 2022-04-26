const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
  validateEdit,
} = require("./user.validator");
const userController = require("./user.controller");

const { catchErrors } = require("../../library/helpers/errorFormatHelpers");
const { getAuthorize } = require("../../library/middlewares/authMiddleware");
const {
  isResetTokenValid,
} = require("../../library/middlewares/resetPasswordMiddleware");

router.post(
  "/register",
  validateSignUp(),
  catchErrors(userController.register)
);
router.post(
  "/verify-email",
  validateSignUp(),
  catchErrors(userController.verifyEmail)
);
router.post("/login", validateSignUp(), catchErrors(userController.userLogin));
router.post(
  "/forgot-password",
  validateSignUp(),
  catchErrors(userController.forgotPassword)
);

module.exports = router;
