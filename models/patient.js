const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    patientName: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    currentStatus: {
      type: String,
      trim: true,
      required: true,
      enum: ["Severe", "Moderate", "Mild"],
    },
    bedNo: {
      type: String,
      trim: true,
      required: true,
    },
    ventilator: {
      type: Boolean,
      default: false,
    },
    discharged: {
      type: Boolean,
      default: false,
    },
    admitDate: {
      type: Date,
    },
    dischargeDate: {
      type: Date,
    },
    ventilatorFromDate: {
      type: Date,
    },
    ventilatorToDate: {
      type: Date,
    },
    address: {
      type: String,
    },
    insurance: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    postalCode: {
      type: String,
    },
    hospital: {
      type: ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
