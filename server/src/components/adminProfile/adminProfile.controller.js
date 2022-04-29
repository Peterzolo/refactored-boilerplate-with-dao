const { sendResponse } = require("../../library/helpers/responseHelpers");
const logger = require("../../library/helpers/loggerHelpers");
const adminProfileService = require("./adminProfile.service");
const adminProfileDao = require("./adminProfile.dao");
const adminProfileError = require("./adminProfile.error");
const userDao = require("../user/user.dao");
const userError = require("../user/user.error");

exports.PostAdminProfile = async (req, res) => {
  const body = req.body;
  try {
    const userId = req.userId;
    const user = req.body.user;

    if (userId !== user) {
      throw adminProfileError.NotAllowed();
    }
    const findUser = await userDao.findUserById(userId);
    if (findUser.isAdmin === false) {
      throw userError.NotAllowed();
    }

    const adminProfileObj = {
      firstName: body.firstName,
      lastName: body.lastName,
      user: body.user,
      gender: body.gender,
      contactPhone: body.contactPhone,
      avatar: body.avatar,
      status: body.status,
      address: body.address,
    };
    const adminProfile = await adminProfileService.createAdminProfile(
      adminProfileObj
    );
    return res.status(200).json(
      sendResponse({
        message: "Profile Successfully created",
        content: adminProfile,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllAdminProfiles = async (req, res) => {
  try {
    const profiles = await adminProfileDao.findAdminProfiles();
    if (!profiles.length) {
      throw adminProfileError.ProfileNotFound();
    }
    return res.status(200).json(
      sendResponse({
        message: "Profiles Successfully fetch",
        content: profiles,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const { profile } = req.params;
    const userId = req.userId;

    const fetchedProfile = await adminProfileDao.fetchSingleAdminProfile(
      profile,
      userId
    );

    console.log('FETCH PROFILE',fetchedProfile)

    if (!fetchedProfile) {
      throw adminProfileError.ProfileNotFound();
    }

    return res.status(200).json(
      sendResponse({
        message: "Profile Successfully fetched",
        content: fetchedProfile,
        success: true,
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

// exports.getAdminProfile = async (req, res) => {
//   try {
//     const { profile } = req.params;
//     const userId = req.userId;

//     const findAdminProfile = await adminProfileDao.findAdminProfileById(
//       profile
//     );

//     const profileOwner = findAdminProfile.user._id.toString();
//     if (userId === profileOwner) {
//       const query = profile;
//       const user = userId;

//       const fetchedProfile = await adminProfileService.getSingleProfile(
//         query,
//         user
//       );
//       console.log("FETCHED PROFILES", fetchedProfile);

//       return res.status(200).json(
//         sendResponse({
//           message: "Profile Successfully fetched",
//           content: fetchedProfile,
//           success: true,
//         })
//       );
//     } else {
//       throw adminProfileError.NotAllowed();
//     }
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
