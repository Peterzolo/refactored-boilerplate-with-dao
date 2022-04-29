const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
  validateEdit,
} = require("./product.validator");
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
  getAuthorize,
  catchErrors(adminProfileController.fetchAllAdminProfiles)
);
router.get(
  "/fetch-one/:profile",
  getAuthorize,
  catchErrors(adminProfileController.getAdminProfile)
);
router.put(
  "/edit/:profile",
  getAuthorize,
  catchErrors(adminProfileController.updateAdminProfile)
);
router.delete(
  "/remove/:profile",
  getAuthorize,
  catchErrors(adminProfileController.removeAdminProfile)
);

module.exports = router;
