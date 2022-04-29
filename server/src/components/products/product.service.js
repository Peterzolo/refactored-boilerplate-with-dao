const config = require("../../config");

const productDao = require("./product.dao");
const productError = require("./product.error");
const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

exports.createProduct = async ({
  name,
  description,
  category,
  image,
  brand,
  model,
  yearManufactured,
  price,
  status,
}) => {
  try {
    const findProduct = await productDao.findProductByUser({
      name,
    });

    if (findProduct) {
      return productError.ProductExist();
    }
    const productData = {
      name,
      description,
      category,
      image,
      brand,
      model,
      yearManufactured,
      price,
      status,
    };
    const productObject = await productDao.savedProductPayloadAndPopulate(
      productData
    );

    return {
      name: productObject.name,
      description: productObject.description,
      category: productObject.category,
      image: productObject.image,
      brand: productObject.brand,
      model: productObject.model,
      yearManufactured: productObject.yearManufactured,
      price: productObject.price,
      status: productObject.status,
    };
  } catch (error) {
    return error;
  }
};
