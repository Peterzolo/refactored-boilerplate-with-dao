
const config = require("../../config");
const categoryDao = require("./category.dao");
const categoryError = require("./category.error");
const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

exports.createCategory = async ({
  name,
  description,
  status,
}) => {
  try {
    const findCategory = await categoryDao.findCategoryByUser({
      name,
    });

    if (findCategory) {
      return categoryError.CategoryExist();
    }
    const categoryData = {
      name,
      description,
      status,
    };
    const categoryObject = await categoryDao.savedCategoryPayloadAndPopulate(
      categoryData
    );

    return {
      name: categoryObject.name,
      description: categoryObject.description,
      status: categoryObject.status,
    };
  } catch (error) {
    return error;
  }
};
