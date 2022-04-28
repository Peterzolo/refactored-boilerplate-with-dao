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
      trim: true,
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
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
  { collection: "users" }
);

const AdminProfile = mongoose.model("user", AdminProfileSchema);

module.exports = AdminProfile;
