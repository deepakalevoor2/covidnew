const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var hospitalSchema = new mongoose.Schema(
  {
    hospitalCode: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      maxlength: 100,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    ventilators: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    insurance: {
      type: Boolean,
      default: true,
    },
    postalCode: {
      type: String,
    },
    availBeds: {
      type: Number,
    },
    availVentilators: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
