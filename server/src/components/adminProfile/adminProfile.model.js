const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    resetPassword: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
  { collection: "users" }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hash = await bcrypt.hashSync(this.password);
    this.password = hash;

    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.comparePassword = async function(password) {
	const result = await bcrypt.compareSync(password, this.password);
	return result;
};


const User = mongoose.model("user", UserSchema);

module.exports = User;
