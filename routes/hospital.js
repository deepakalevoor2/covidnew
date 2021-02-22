const express = require("express");
const router = express.Router();

const {
  getHospital,
  createHospital,
  getBeds,
  getVents,
} = require("../controllers/hospital");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//params
router.param("userId", getUserById);

//read
router.get("/hospital/:hospcode", getHospital);
router.get("/dashboard/beds", getBeds);
router.get("/dashboard/vents", getVents);

//post
router.post(
  "/hospital/create/:userId",
  isSignedIn,
  isAuthenticated,
  createHospital
);

module.exports = router;
