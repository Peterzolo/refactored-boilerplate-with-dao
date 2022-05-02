const express = require("express");
const router = express.Router();


const {
  validateSignUp,
  validateLogin,
  validateEdit,
} = require("./category.validator");
const CategoryController = require("./Category.controller");

const { catchErrors } = require("../../library/helpers/errorFormatHelpers");
const { getAuthorize } = require("../../library/middlewares/authMiddleware");

router.post(
  "/create",
  // validateSignUp(),
  getAuthorize,
  catchErrors(CategoryController.postCategory)
);
router.get("/fetch-all", catchErrors(CategoryController.fetchAllCategories));
router.get("/fetch-one/:category", catchErrors(CategoryController.getCategory));
router.put(
  "/edit/:category",
  getAuthorize,
  catchErrors(CategoryController.updateCategory)
);
router.delete(
  "/remove/:category",
  getAuthorize,
  catchErrors(CategoryController.removeCategory)
);
router.post(
  "/search",
  catchErrors(CategoryController.categorySearch)
);
router.get(
  "/paginate",
  catchErrors(CategoryController.fetchCategoryAndPaginate)
);


module.exports = router;
