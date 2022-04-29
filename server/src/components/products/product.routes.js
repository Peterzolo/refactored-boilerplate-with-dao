const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
  validateEdit,
} = require("./product.validator");
const productController = require("./product.controller");

const { catchErrors } = require("../../library/helpers/errorFormatHelpers");
const { getAuthorize } = require("../../library/middlewares/authMiddleware");

router.post(
  "/create",
  // validateSignUp(),
  getAuthorize,
  catchErrors(productController.Postproduct)
);
router.get("/fetch-all", catchErrors(productController.fetchAllProducts));
router.get("/fetch-one/:product", catchErrors(productController.getProduct));
router.put(
  "/edit/:product",
  getAuthorize,
  catchErrors(productController.updateProduct)
);
router.delete(
  "/remove/:product",
  getAuthorize,
  catchErrors(productController.removeProduct)
);

module.exports = router;
