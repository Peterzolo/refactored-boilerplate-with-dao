const { sendResponse } = require("../../library/helpers/responseHelpers");
const logger = require("../../library/helpers/loggerHelpers");
const categoryService = require("./category.service");
const categoryDao = require("./category.dao");
const categoryError = require("./category.error");
const userDao = require("../user/user.dao");
const userError = require("../user/user.error");

exports.postCategory = async (req, res) => {
  const body = req.body;
  try {
    const userId = req.userId;
    const findUser = await userDao.findUserById(userId);
    if (findUser.isAdmin === false) {
      throw categoryError.NotAllowed();
    }
    const categoryObj = {
      name: body.name,
      decription: body.decription,
      status: body.status,
    };
    const category = await categoryService.createCategory(categoryObj);
    return res.status(200).json(
      sendResponse({
        message: "category Successfully created",
        content: category,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllCategories = async (req, res) => {
  try {
    const categories = await categoryDao.findCategories();
    if (!categories.length) {
      throw categoryError.CategoryNotFound();
    }
    return res.status(200).json(
      sendResponse({
        message: "categorys Successfully fetch",
        content: categories,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const fetchedCategory = await categoryDao.fetchSingleCategory(category);

    if (!fetchedCategory) {
      throw categoryError.CategoryNotFound();
    }

    return res.status(200).json(
      sendResponse({
        message: "category Successfully fetched",
        content: fetchedCategory,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const findUser = await userDao.findUserById(userId);
    const userIsAdmin = findUser.isAdmin === true;
    if (!userIsAdmin) {
      throw categoryError.NotAllowed();
    }

    const findCategory = await categoryDao.findCategoryById(category);

    if (findCategory.status === "inactive") {
      throw categoryError.CategoryNotFound();
    }

    const query = category;
    const user = userId;
    const update = updateData;

    let editedCategory = await categoryDao.editCategory(query, user, update);

    if (!editedCategory) {
      throw categoryError.CategoryNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "category updated",
        content: editedCategory,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.userId;

    const findUser = await userDao.findUserById(userId);
    const userIsAdmin = findUser.isAdmin === true;
    if (!userIsAdmin) {
      throw categoryError.NotAllowed();
    }

    const findCategory = await categoryDao.findCategoryById(category);

    if (findCategory.status === "inactive") {
      throw categoryError.CategoryNotFound();
    }

    const query = category;
    const user = userId;

    let deletedCategory = await categoryDao.deleteCategory(query, user);

    if (!deletedCategory) {
      throw categoryError.CategoryNotFound();
    }
    return res.status(200).send(
      sendResponse({
        message: "category updated",
        content: deletedCategory,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
