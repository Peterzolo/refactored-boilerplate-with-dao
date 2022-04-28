const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const handler = require("./library/helpers/errorHandlers");
const config = require("./config");
const { userModule, adminProfileModule } = require("./components");

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.set("trust proxy", 1);

app.use(`/api/user`, userModule.routes);
app.use(`/api/admin-profile`, adminProfileModule.routes);

handler.handleErrors(app);

module.exports = app;
