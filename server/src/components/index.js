const userRoutes = require("./user/user.routes");
const adminProfileRoutes = require("./adminProfile/adminProfile.routes");
const productRoutes = require("./products/product.routes");
const categoryRoutes = require("./category/category.routes");

const componentModule = {
  userModule: {
    routes: userRoutes,
  },
  adminProfileModule: {
    routes: adminProfileRoutes,
  },
  productModule: {
    routes: productRoutes,
  },
  categoryModule: {
    routes: categoryRoutes,
  },
};

module.exports = componentModule;
