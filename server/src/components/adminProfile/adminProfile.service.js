const config = require("../../config");
const adminProfileDao = require("./adminProfile.dao");
const adminProfileError = require("./adminProfile.error");
const adminprofileDao = require("./adminProfile.dao");
const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

exports.createAdminProfile = async ({
  firstName,
  lastName,
  user,
  gender,
  contactPhone,
  avatar,
  status,
  address,
}) => {
  try {
    const findAdminProfile = await adminProfileDao.findAdminProfileByUser({
      user,
    });
    console.log("FIND ADMIN PROFILE", findAdminProfile);
    if (findAdminProfile) {
      return adminProfileError.ProfileExist();
    }
    const adminProfileObject = {
      firstName,
      lastName,
      user,
      gender,
      contactPhone,
      avatar,
      status,
      address,
    };
    const savedProfileAdminObject =
      // await adminProfileDao.saveAdminProfilePayload(adminProfileObject);
      await adminProfileDao.savedAdminPayloadAndPopulate(adminProfileObject);

    return {
      firstName: savedProfileAdminObject.firstName,
      lastName: savedProfileAdminObject.lastName,
      user: savedProfileAdminObject.user,
      gender: savedProfileAdminObject.gender,
      contactPhone: savedProfileAdminObject.contactPhone,
      avatar: savedProfileAdminObject.avatar,
      status: savedProfileAdminObject.status,
      address: savedProfileAdminObject.address,
    };
  } catch (error) {
    return error;
  }
};

exports.getSingleProfile = async (id) => {
  const profile = await adminProfileDao.fetchSingleAdminprofile({ _id: id });
  return profile;
};
