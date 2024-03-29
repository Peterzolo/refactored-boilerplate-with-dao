const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const VerifyTokenSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// VerifyTokenSchema.pre("save", async function (next) {
//   if (this.isModified("token")) {
//     const hash = await bcrypt.hash(this.token, 8);
//     this.token = hash;
//   }
//   next();
// });

VerifyTokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

const VerifyToken = mongoose.model("VerifyToken", VerifyTokenSchema);

module.exports = VerifyToken;
