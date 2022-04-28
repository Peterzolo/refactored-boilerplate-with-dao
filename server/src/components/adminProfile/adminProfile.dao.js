const ProfileAdmin = require("./adminProfile.model");

exports.findAdminProfileById = async (id) => {
  const profile = await ProfileAdmin.findById(id);
  return profile;
};

exports.saveAdminProfilePayload = async (args) => {
  const payload = await ProfileAdmin.create(args);
  return payload;
};

exports.findAdminProfiles = async () => {
  const profiles = await ProfileAdmin.find();
  return profiles;
};

exports.findOneAdminProfile = async ({query}) => {
  const singleAdminProfile = await ProfileAdmin.findOne({query});
  return singleAdminProfile;
};

exports.editAdminProfile = async (args) => {
  const profile = await ProfileAdmin.findByIdAndUpdate(args);
  return profile;
};

exports.deleteAdminProfile = async (args) => {
  const profile = await ProfileAdmin.findByIdAndUpdate(args);
  return profile;
};
