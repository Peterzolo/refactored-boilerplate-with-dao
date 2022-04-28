const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const AdminProfileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    phoneContact: {
      type: Number,
    },
    address: {
      streetName: {
        type: String,
        required: true,
      },
      houseNum: {
        type: Number,
        // required: true,
      },
      area: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      country: {
        type: String,
        // required: true,
      },
    },

    avatar: {
      type: String,
      default:
        "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const ProfileAdmin = mongoose.model("profileAdmin", AdminProfileSchema);

module.exports = ProfileAdmin;
