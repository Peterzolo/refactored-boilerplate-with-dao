const User = require("./user.model");
const VerifyToken = require("./VerificationToken");

exports.findVerifyToken = async (id) => {
  const token = await VerifyToken.findOne(id);
  return token;
};

exports.deleteVerifyToken = async(id) =>{
  const token = await VerifyToken.findByIdAndDelete({_id : id})
  return token
}

exports.findUserByEmail = async (email) => {
  const user = await User.findOne(email);
  return user;
};
exports.findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.saveUserPayload = async (args) => {
  const payload = await User.create(args);
  return payload;
};

exports.saveUserVerificationTokenPayload = async (args) => {
  const payload = await VerifyToken.create(args);
  return payload;
};
