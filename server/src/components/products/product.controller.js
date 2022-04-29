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
        message: "Profile Successfully created",
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
    const profiles = await productDao.findProducts();
    if (!profiles.length) {
      throw productError.ProfileNotFound();
    }
    return res.status(200).json(
      sendResponse({
        message: "Profiles Successfully fetch",
        content: profiles,
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
      throw productError.ProfileNotFound();
    }

    return res.status(200).json(
      sendResponse({
        message: "Profile Successfully fetched",
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
    const { profile } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const findProduct = await productDao.findProductById(profile);
    P;
    if (findProduct.status === "inactive") {
      throw productError.ProfileNotFound();
    }

    const profileOwner = findProduct.user._id.toString();
    if (profileOwner !== userId) {
      throw productError.NotAllowed();
    }

    const query = profile;
    const user = userId;
    const update = updateData;

    let editedProfile = await productDao.editProduct(query, user, update);

    if (!editedProfile) {
      throw productError.ProfileNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "profile updated",
        content: editedProfile,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { profile } = req.params;
    const userId = req.userId;

    const findProduct = await productDao.findProductById(profile);

    const profileOwner = findProduct.user._id.toString();
    if (profileOwner !== userId) {
      throw productError.NotAllowed();
    }

    const query = profile;
    const user = userId;

    let deletedProfile = await productDao.deleteProduct(query, user);

    if (!deletedProfile) {
      throw productError.ProfileNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "profile updated",
        content: deletedProfile,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
