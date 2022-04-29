const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default : "Product added"
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      default: "626bafa82b46a91abccc705c",
    },
    image: {
      type: String,
      default:
        "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
    },
    brand: {
      type: String,
      required: true,
    },
    model:{
      type : String,
      required : true
    },
    yearManufactured:{
      type : Number,
      required : true
    },
    price: {
      type: Number,
      required: true,
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

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
