const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const userService = require("./user.service");
const userDao = require("./user.dao");
const userError = require("./user.error");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { isValidObjectId } = require("mongoose");
const VerifyToken = require("./VerificationToken");
const ResetToken = require("./ResetPassword");
const { sendResponse } = require("../../library/helpers/responseHelpers");
const logger = require("../../library/helpers/loggerHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");
const {
  generateOTP,
  createRandomBytes,
} = require("../../library/helpers/utils/utility");
exports.register = async (req, res) => {
  const body = req.body;
  try {
    const userObject = {
      email: body.email,
      password: body.password,
      isAdmin: body.isAdmin,
    };
    const user = await userService.createUser(userObject);

    const sendMail = async (msg) => {
      try {
        await sgMail.send(msg);
        console.log("Email has been sent to your mail box");
      } catch (error) {
        console.error(error);
      }
    };

    const OTP = await userService.saveOTP();
    sendMail({
      to: user.email,
      from: "petsolstudio@gmail.com",
      subject: "Email Verification Code",
      html: `<div>
      <h3>This is a test Email</h3>
      <h2>${OTP}</h2>
      <p>This is your verification code, copy and paste appropriately</p>
      </div>
     `,
    });

    return res.status(200).json(
      sendResponse({
        message:
          "Thanks for signing up, please check your email for verification code",
        content: user,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    if (!userId || !otp.trim()) {
      throw userError.InvalidInput();
    }

    if (!isValidObjectId(userId)) {
      throw userError.InvalidInput();
    }

    const findUser = await userDao.findUserById(userId);

    if (!findUser) {
      throw userError.UserNotFound();
    }

    if (findUser.verified === true) {
      throw userError.UserExist();
    }

    const findToken = await userDao.findVerifyToken({ owner: findUser._id });

    if (!findToken) {
      throw userError.UserNotFound();
    }

    if (otp !== findToken.token) {
      throw userError.TokenError();
    }

    findUser.verified = true;

    // await VerifyToken.findByIdAndDelete(findToken._id);
    await userDao.deleteVerifyToken(findToken._id);
    await findUser.save();

    const sendMail = async (msg) => {
      try {
        await sgMail.send(msg);
        console.log("Email verification successful");
      } catch (error) {
        console.error(error);
      }
    };
    sendMail({
      to: findUser.email,
      from: "petsolstudio@gmail.com",
      subject: "Welcome- you have been verified",
      text: "Email verified successfully",
    });

    res.status(200).send({
      success: true,
      message: " email successfully verified",
      user: {
        email: findUser.email,
        id: findUser._id,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw userError.InvalidInput(errors.mapped());
  }

  const { email, password } = req.body;
  const user = await userService.login(email.toLowerCase(), password);

  return res.status(200).send(
    sendResponse({
      message: "owner successfully logged in",
      content: user,
      success: true,
    })
  );
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw userError.InvalidInput();
    }

    const user = await userDao.findUserByEmail({ email });
    if (!user) {
      throw userError.UserNotFound();
    }

    const token = await userDao.findPasswordResetToken({ owner: user._id });
    if (token) {
      throw userError.TokenMessage();
    }

    const randomBytes = await createRandomBytes();

    const passwordResetObject = {
      owner: user._id,
      token: randomBytes,
    };

    await userDao.savePasswordResetPayload(passwordResetObject);

    const sendMail = async (msg) => {
      try {
        await sgMail.send(msg);
        console.log("Email verification successful");
      } catch (error) {
        console.error(error);
      }
    };
    sendMail({
      to: user.email,
      from: "petsolstudio@gmail.com",
      subject: "Welcome- you have been verified",
      text: "Email verified successfully",
      html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p> <a href ="#">${process.env.CLIENT_URL}/reset-password?token=${randomBytes}&id=${user._id}</a></p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `,
    });

    res.status(200).send({
      success: true,
      message: " email successfully verified",
      user: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
