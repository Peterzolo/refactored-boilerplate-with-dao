const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
  validateEdit,
} = require("./adminProfile.validator");
const adminProfileController = require("./adminProfile.controller");

const { catchErrors } = require("../../library/helpers/errorFormatHelpers");
const { getAuthorize } = require("../../library/middlewares/authMiddleware");

router.post(
  "/create",
  // validateSignUp(),
  getAuthorize,
  catchErrors(adminProfileController.PostAdminProfile)
);
router.get(
  "/fetch-all",
  // validateSignUp(),
  getAuthorize,
  catchErrors(adminProfileController.fetchAllAdminProfiles)
);

module.exports = router;
