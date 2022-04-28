const userRoutes = require("./user/user.routes");
const adminProfileRoutes = require("./adminProfile/adminProfile.routes");

const componentModule = {
  userModule: {
    routes: userRoutes,
  },
  adminProfileModule: {
    routes: adminProfileRoutes,
  },
};

module.exports = componentModule;
