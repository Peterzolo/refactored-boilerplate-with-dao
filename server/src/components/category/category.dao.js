const Category = require("./category.model");
exports.findCategoryById = async (id) => {
  const category = await Category.findById({ _id: id });
  return category;
};

const findAndPopulate = async (
  query = {},
  selectQuery = {},
  path = "",
  pathQuery = "",
  findMode = "one",
  sortQuery = { _id: -1 }
) => {
  const category = await Category.find(query)
    .select(selectQuery)
    .populate({
      path: path,
      select: pathQuery,
    })
    .sort(sortQuery);

  if (findMode === "one") {
    return category[0];
  }
  return category;
};

exports.saveCategoryPayload = async (args) => {
  const payload = await Category.create(args);
  return payload;
};

exports.savedCategoryPayloadAndPopulate = async (args) => {
  const payload = await this.saveCategoryPayload(args);
  const populateItem = await findAndPopulate({ _id: payload._id }, null);
  return payload, populateItem;
};

exports.findCategories = async () => {
  const category = await Category.find({ status: "active" }).populate("");
  return category;
};
exports.fetchSingleCategory = async (id) => {
  const singleCategory = await Category.findOne({
    _id: id,
    status: "active",
  });
  return singleCategory;
};

exports.findCategoryByUser = async (query) => {
  const singleCategory = await Category.findOne(query);
  return singleCategory;
};

exports.editCategory = async (id, userId, CategoryObj) => {
  const category = await Category.findByIdAndUpdate(
    { _id: id, user: userId },
    { $set: CategoryObj },
    { new: true }
  );
  return category;
};

exports.deleteCategory = async (id, userId) => {
  const category = await Category.findByIdAndUpdate(
    {
      _id: id,
      user: userId,
    },
    { $set: { status: "inactive" } },
    { new: true }
  );
  return category;
};

exports.searchCategory = async (query) => {
  const category = await Category.find(query);
  return category;
};

exports.findCategoryAndPaginate = async ({}, query) => {
  const categories = await Category.paginate({}, query);
  return categories;
};
