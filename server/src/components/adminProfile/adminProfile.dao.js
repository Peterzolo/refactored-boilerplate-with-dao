const AdminProfile = require("./adminProfile.model");

exports.findAdminProfileById = async (id) => {
  const profile = await AdminProfile.findById(id);
  return profile;
};

exports.findAdminProfileByEmail = async (id) => {
  const user = await AdminProfile.findOne(id);
  return user;
};

exports.saveAdminProfilePayload = async (args) => {
  const payload = await User.create(args);
  return payload;
};

exports.findAdminProfiles = async () => {
  const profiles = await AdminProfile.find();
  return profiles;
};

exports.findOneAdminProfile = async (query) => {
  const singleAdminProfile = await AdminProfile.find(query);
  return singleAdminProfile;
};

exports.editAdminProfile = async (args) => {
  const profile = await AdminProfile.findByIdAndUpdate(args);
  return profile;
};

exports.deleteAdminProfile = async (args) => {
  const profile = await AdminProfile.findByIdAndUpdate(args);
  return profile;
};
