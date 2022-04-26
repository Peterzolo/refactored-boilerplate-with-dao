const { isValidObjectId } = require("mongoose");
const userError = require("../../components/user/user.error");
const userDao = require("../../components/user/user.dao");

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  try {
    if (!token || !id) {
      return userError.InvalidInput();
    }

    if (!isValidObjectId(id)) {
      return userError.NotAllowed();
    }

    const user = await userDao.findUserById({ _id: id });

    if (!user) {
      return userError.UserNotFound();
    }

    const resetToken = await userDao.findPasswordResetToken({
      owner: user._id,
    });

    if (!resetToken) {
      return userError.TokenNotFound();
    }

    const isValidToken = await resetToken.compareToken(token);

    if (!isValidToken) {
      return userError.TokenError();
    }

    req.userId = user;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
