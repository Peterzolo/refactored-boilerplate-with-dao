const config = require("../../config");
const adminProfileDao = require("./adminProfile.dao");
const adminProfileError = require("./adminProfile.error");
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
      await adminProfileDao.saveAdminProfilePayload(adminProfileObject);

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

// exports.createAdminProfile = async ({
//   firstName,
//   lastName,
//   user,
//   gender,
//   contactPhone,
//   address,
//   avatar,
//   status,
// }) => {
//   try {
//     const adminProfileObject = {
//       firstName,
//       lastName,
//       user,
//       gender,
//       contactPhone,
//       address,
//       avatar,
//       status,
//     };
//     const savedAdminProfile = await adminProfileDao.saveAdminProfilePayload(
//       adminProfileObject
//     );
//     return {
//       firstName: savedAdminProfile.firstName,
//       lastName: savedAdminProfile.lastName,
//       user: savedAdminProfile.user,
//       gender: savedAdminProfile.gender,
//       contactPhone: savedAdminProfile.contactPhone,
//       address: savedAdminProfile.address,
//       avatar: savedAdminProfile.avatar,
//       status: savedAdminProfile.status,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
