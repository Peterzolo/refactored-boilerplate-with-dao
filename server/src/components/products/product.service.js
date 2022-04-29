const config = require("../../config");

const productDao = require("./product.dao");
const productError = require("./product.error");
const productDao = require("./product.dao");
const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

exports.createproduct = async ({
  name,
  description,
  category,
  image,
  brand,
  price,
  status,
}) => {
  try {
    const findproduct = await productDao.findproductByUser({
      user,
    });

    if (findproduct) {
      return productError.ProfileExist();
    }
    const productData = {
      name,
      description,
      category,
      image,
      brand,
      price,
      status,
    };
    const productObject = await productDao.savedAdminPayloadAndPopulate(
      productData
    );

    return {
      name: productObject.name,
      description: productObject.description,
      category: productObject.category,
      image: productObject.image,
      brand: productObject.brand,
      price: productObject.price,
      status: productObject.status,
    };
  } catch (error) {
    return error;
  }
};
