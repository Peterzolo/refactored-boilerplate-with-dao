const Product = require("./product.model");
Product;
exports.findProductById = async (id) => {
  const profile = await Product.findById({ _id: id });
  return profile;
};

const findAndPopulate = async (
  query = {},
  selectQuery = {},
  path = "",
  pathQuery = "",
  findMode = "one",
  sortQuery = { _id: -1 }
) => {
  const product = await Product.find(query)
    .select(selectQuery)
    .populate({
      path: path,
      select: pathQuery,
    })
    .sort(sortQuery);

  if (findMode === "one") {
    return product[0];
  }
  return product;
};

exports.saveProductPayload = async (args) => {
  const payload = await Product.create(args);
  return payload;
};

exports.savedProductPayloadAndPopulate = async (args) => {
  const payload = await this.saveProductPayload(args);
  const populateItem = await findAndPopulate({ _id: payload._id }, null);
  return payload, populateItem;
};

exports.findProducts = async () => {
  const products = await Product.find({ status: "active" }).populate("");
  return products;
};
exports.fetchSingleProduct = async (id) => {
  const singleProduct = await Product.findOne({
    _id: id,
    status: "active",
  });
  return singleProduct;
};

exports.findProductByUser = async (query) => {
  const singleProduct = await Product.findOne(query);
  return singleProduct;
};

exports.editProduct = async (id, userId, ProductObj) => {
  const profile = await Product.findByIdAndUpdate(
    { _id: id, user: userId },
    { $set: ProductObj },
    { new: true }
  );
  return profile;
};

exports.deleteProduct = async (id, userId) => {
  const profile = await Product.findByIdAndUpdate(
    {
      _id: id,
      user: userId,
    },
    { $set: { status: "inactive" } },
    { new: true }
  );
  return profile;
};
