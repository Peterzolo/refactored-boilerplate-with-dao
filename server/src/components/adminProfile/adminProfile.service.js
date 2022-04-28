const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const crypto = require("crypto");
const VerifyToken = require("./VerificationToken");
const userError = require("./user.error");
const userDao = require("./user.dao");

const config = require("../../config");

const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

const {
  generateOTP,
  createRandomBytes,
} = require("../../library/helpers/utils/utility");

exports.createUser = async ({ email, password, isAdmin }) => {
  try {
    const findUser = await userDao.findUserByEmail({ email });
    if (findUser) {
      return userError.UserExist();
    }
    const userObject = {
      email,
      password,
      isAdmin,
    };
    const savedUser = await userDao.saveUserPayload(userObject);
    const OTP = generateOTP();

    const verifyTokenObject = {
      owner: savedUser._id,
      token: OTP,
    };
    const verifiyToken = await userDao.saveUserVerificationTokenPayload(
      verifyTokenObject
    );

    exports.saveOTP = async () => {
      const savedOtp = await verifiyToken.token;
      return savedOtp;
    };

    return {
      email: savedUser.email,
      owner: verifiyToken.owner,
      // token: verifiyToken.token,
    };
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (email, password) => {
  try {
    const user = await userDao.findUserByEmail({ email });
    if (!user) {
      logger.warn("Authentication failed. Wrong credential.");
      return userError.WrongCredential();
    }

    if (user.status === "inactive") {
      logger.warn("user account not activated");
      return userError.Inactive();
    }

    if (user.verified === false) {
      return userError.UnverifiedUser();
    }

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      logger.warn("Authentication failed. Wrong credential.");
      return userError.WrongCredential();
    }

    let token = jwtHelpers.encode({
      email: user.email,
      userId: user._id,
      isAdmin: user.isAdmin,
    });

    logger.info(`Auth token created: ${token}`);
    return {
      token: `${config.tokenType} ${token}`,
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
        status: user.status,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
