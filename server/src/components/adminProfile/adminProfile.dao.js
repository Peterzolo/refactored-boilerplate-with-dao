const ProfileAdmin = require("./adminProfile.model");

exports.findAdminProfileById = async (id) => {
  const profile = await ProfileAdmin.findById({ _id: id });
  return profile;
};

const findAndPopulate = async (
  query = {},
  selectQuery = {},
  path = "user",
  pathQuery = "-password",
  findMode = "one",
  sortQuery = { _id: -1 }
) => {
  const profileAdmin = await ProfileAdmin.find(query)
    .select(selectQuery)
    .populate({
      path: path,
      select: pathQuery,
    })
    .sort(sortQuery);

  if (findMode === "one") {
    return profileAdmin[0];
  }
  return profileAdmin;
};

exports.saveAdminProfilePayload = async (args) => {
  const payload = await ProfileAdmin.create(args);
  return payload;
};

exports.savedAdminPayloadAndPopulate = async (args) => {
  const payload = await this.saveAdminProfilePayload(args);
  const populateItem = await findAndPopulate({ _id: payload._id }, null);
  return payload, populateItem;
};

exports.findAdminProfiles = async () => {
  const profiles = await ProfileAdmin.find({ status: "active" }).populate(
    "user",
    "-password"
  );
  return profiles;
};
exports.fetchSingleAdminProfile = async (id) => {
  const singleProfile = await ProfileAdmin.findOne({
    _id: id,
    status: "active",
  }).populate("user", "-password");
  return singleProfile;
};

exports.findAdminProfileByUser = async (query) => {
  const singleAdminProfile = await ProfileAdmin.findOne(query);
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
