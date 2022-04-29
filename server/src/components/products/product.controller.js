const { sendResponse } = require("../../library/helpers/responseHelpers");
const logger = require("../../library/helpers/loggerHelpers");
const productService = require("./product.service");
const productDao = require("./product.dao");
const productError = require("./product.error");
const userDao = require("../user/user.dao");
const userError = require("../user/user.error");

exports.Postproduct = async (req, res) => {
  const body = req.body;
  try {
    const userId = req.userId;
    const findUser = await userDao.findUserById(userId);
    if (findUser.isAdmin === false) {
      throw productError.NotAllowed();
    }

    const productObj = {
      name: body.name,
      decription: body.decription,
      category: body.category,
      image: body.image,
      brand: body.brand,
      model: body.model,
      yearManufactured: body.yearManufactured,
      price: body.price,
      status: body.status,
    };
    const product = await productService.createProduct(productObj);
    console.log(product);
    return res.status(200).json(
      sendResponse({
        message: "product Successfully created",
        content: product,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await productDao.findProducts();
    if (!products.length) {
      throw productError.productNotFound();
    }
    return res.status(200).json(
      sendResponse({
        message: "products Successfully fetch",
        content: products,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { product } = req.params;

    const fetchedProduct = await productDao.fetchSingleProduct(product);

    if (!fetchedProduct) {
      throw productError.productNotFound();
    }

    return res.status(200).json(
      sendResponse({
        message: "product Successfully fetched",
        content: fetchedProduct,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { product } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const findUser = await userDao.findUserById(userId);
    const userIsAdmin = findUser.isAdmin === true;
    if (!userIsAdmin) {
      throw productError.NotAllowed();
    }

    const findProduct = await productDao.findProductById(product);

    if (findProduct.status === "inactive") {
      throw productError.ProductNotFound();
    }

    const query = product;
    const user = userId;
    const update = updateData;

    let editedProduct = await productDao.editProduct(query, user, update);

    if (!editedProduct) {
      throw productError.ProductNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "product updated",
        content: editedProduct,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { product } = req.params;
    const userId = req.userId;


    const findUser = await userDao.findUserById(userId);
    const userIsAdmin = findUser.isAdmin === true;
    if (!userIsAdmin) {
      throw productError.NotAllowed();
    }

    const findProduct = await productDao.findProductById(product);

    if (findProduct.status === "inactive") {
      throw productError.ProductNotFound();
    }
    const query = product;
    const user = userId;

    let deletedProduct = await productDao.deleteProduct(query, user);

    if (!deletedProduct) {
      throw productError.productNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "product updated",
        content: deletedProduct,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
